import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateTripDetails = mutation({
    args: {
        tripId: v.string(),
        tripDetails: v.any(),
        uid: v.id('UserTable'),
    },
    handler: async (ctx, { tripId, tripDetails, uid }) => {
        try {
            // Validate and sanitize the trip details before inserting
            const sanitizedTripDetails = validateTripDetails(tripDetails);
            
            return await ctx.db.insert("TripDetailsTable", {
                tripId,
                tripDetails: sanitizedTripDetails,
                uid,
            });
        } catch (error) {
            console.error("Error in CreateTripDetails:", error);
            throw new Error(`Failed to create trip details: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
})

// Helper function to validate and sanitize trip details
function validateTripDetails(tripDetails: any): any {
    // Make a deep copy to avoid modifying the original
    const sanitized = JSON.parse(JSON.stringify(tripDetails));
    
    // Check for required fields
    const requiredFields = ['destination', 'duration', 'origin', 'budget', 'group_size'];
    const missingFields = requiredFields.filter(field => !sanitized[field]);
    
    if (missingFields.length > 0) {
        console.warn(`Trip data missing fields: ${missingFields.join(', ')}`);
        // Fill in missing fields with empty values rather than failing
        missingFields.forEach(field => {
            sanitized[field] = '';
        });
    }
    
    // Ensure hotels is an array
    if (!Array.isArray(sanitized.hotels)) {
        sanitized.hotels = [];
    } else {
        // Validate each hotel
        sanitized.hotels = sanitized.hotels.filter(Boolean).map((hotel: any) => ({
            hotel_name: hotel.hotel_name || '',
            hotel_address: hotel.hotel_address || '',
            price_per_night: hotel.price_per_night || '',
            hotel_image_url: hotel.hotel_image_url || '',
            geo_coordinates: {
                latitude: typeof hotel.geo_coordinates?.latitude === 'number' ? hotel.geo_coordinates.latitude : 0,
                longitude: typeof hotel.geo_coordinates?.longitude === 'number' ? hotel.geo_coordinates.longitude : 0
            },
            rating: typeof hotel.rating === 'number' ? hotel.rating : 0,
            description: hotel.description || ''
        }));
    }
    
    // Ensure itinerary is an array
    if (!Array.isArray(sanitized.itinerary)) {
        sanitized.itinerary = [];
    } else {
        // Validate each day in the itinerary
        sanitized.itinerary = sanitized.itinerary.filter(Boolean).map((day: any, index: number) => {
            const validDay: any = {
                day: typeof day.day === 'number' ? day.day : index + 1,
                day_plan: day.day_plan || '',
                best_time_to_visit_day: day.best_time_to_visit_day || '',
                activities: []
            };
            
            // Validate activities
            if (Array.isArray(day.activities)) {
                validDay.activities = day.activities.filter(Boolean).map((activity: any) => ({
                    place_name: activity.place_name || '',
                    place_details: activity.place_details || '',
                    place_image_url: activity.place_image_url || '',
                    place_address: activity.place_address || '',
                    ticket_pricing: activity.ticket_pricing || '',
                    time_travel_each_location: activity.time_travel_each_location || '',
                    best_time_to_visit: activity.best_time_to_visit || '',
                    geo_coordinates: {
                        latitude: typeof activity.geo_coordinates?.latitude === 'number' ? activity.geo_coordinates.latitude : 0,
                        longitude: typeof activity.geo_coordinates?.longitude === 'number' ? activity.geo_coordinates.longitude : 0
                    }
                }));
            }
            
            return validDay;
        });
    }
    
    return sanitized;
}

export const GetUserTrip = mutation({
    args: {
        uid: v.id('UserTable'),
    },
    handler: async (ctx, { uid }) => {
        return await ctx.db.query("TripDetailsTable")
        .filter(q => q.eq(q.field("uid"), uid))
        .order('desc')
        .collect();
    }
})
export const TripDetailsByTripId = mutation({
    args: {
        tripId: v.string(),
    },
    handler: async (ctx, { tripId }) => {
        return await ctx.db.query("TripDetailsTable").filter(q => q.eq(q.field("tripId"), tripId)).collect();
    }
})

export const GetTripById = query({
    args: {
        uid: v.id('UserTable'),
        tripid: v.string(),
    },
    handler: async (ctx, { uid, tripid }) => {
        const result = await ctx.db.query("TripDetailsTable")
        .filter(q => q.and(
            q.eq(q.field("uid"), uid),
            q.eq(q.field("tripId"), tripid)
        ))
        .collect();
        return result[0];
    }
})