import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateTripDetails = mutation({
    args: {
        tripId: v.string(),
        tripDetails: v.any(),
        uid: v.id('UserTable'),
    },
    handler: async (ctx, { tripId, tripDetails, uid }) => {
        return await ctx.db.insert("TripDetailsTable", {
            tripId,
            tripDetails,
            uid,
        });
    }
})

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