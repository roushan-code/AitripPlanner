// lib/mongodb/models/TripDetails.ts
import mongoose, { Schema } from 'mongoose';

// Coordinate Schema
const coordinateSchema = new Schema({
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 }
});

// Hotel Schema
const hotelSchema = new Schema({
  hotel_name: { type: String, required: true },
  hotel_address: { type: String },
  price_per_night: { type: String },
  hotel_image_url: { type: String },
  geo_coordinates: { type: coordinateSchema, default: () => ({}) },
  rating: { type: Number, default: 0 },
  description: { type: String }
});

// Activity Schema
const activitySchema = new Schema({
  place_name: { type: String, required: true },
  place_details: { type: String },
  place_image_url: { type: String },
  place_address: { type: String },
  ticket_pricing: { type: String },
  time_travel_each_location: { type: String },
  best_time_to_visit: { type: String },
  geo_coordinates: { type: coordinateSchema, default: () => ({}) }
});

// Day Schema
const daySchema = new Schema({
  day: { type: Number, required: true },
  day_plan: { type: String },
  best_time_to_visit_day: { type: String },
  activities: { type: [activitySchema], default: [] }
});

// Trip Details Schema
const tripDetailsSchema = new Schema(
  {
    tripId: { type: String, required: true, unique: true },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    tripDetails: {
      destination: { type: String },
      duration: { type: String },
      origin: { type: String },
      budget: { type: String },
      group_size: { type: String },
      hotels: { type: [hotelSchema], default: [] },
      itinerary: { type: [daySchema], default: [] }
    }
  },
  { timestamps: true }
);

export default mongoose.models.TripDetails || mongoose.model('TripDetails', tripDetailsSchema);