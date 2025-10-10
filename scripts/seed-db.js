// scripts/seed-db.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Connection URL
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable in .env.local');
  process.exit(1);
}

// Define schemas
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String },
  subscription: { type: String, default: 'free' },
  requestsCount: { type: Number, default: 0 },
  lastRequestDate: { type: Date },
  clerkId: { type: String, required: true },  // Removed unique constraint temporarily
}, { timestamps: true });

const coordinateSchema = new Schema({
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 }
});

const hotelSchema = new Schema({
  hotel_name: { type: String, required: true },
  hotel_address: { type: String },
  price_per_night: { type: String },
  hotel_image_url: { type: String },
  geo_coordinates: { type: coordinateSchema, default: () => ({}) },
  rating: { type: Number, default: 0 },
  description: { type: String }
});

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

const daySchema = new Schema({
  day: { type: Number, required: true },
  day_plan: { type: String },
  best_time_to_visit_day: { type: String },
  activities: { type: [activitySchema], default: [] }
});

const tripDetailsSchema = new Schema({
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
}, { timestamps: true });

// Register models
const User = mongoose.models.User || mongoose.model('User', userSchema);
const TripDetails = mongoose.models.TripDetails || mongoose.model('TripDetails', tripDetailsSchema);

// Connect to MongoDB
async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // First check and clean up any existing data issues
    console.log('Checking for existing data issues...');
    
    // 1. Find if there are any documents with null clerkId values
    const usersWithNullClerkId = await User.find({ clerkId: null });
    
    if (usersWithNullClerkId.length > 0) {
      console.log(`Found ${usersWithNullClerkId.length} users with null clerkId values. Removing them...`);
      await User.deleteMany({ clerkId: null });
      console.log('Removed users with null clerkId values.');
    } else {
      console.log('No users with null clerkId values found.');
    }
    
    // Now create indexes
    console.log('Creating indexes...');
    
    // Add unique index on clerkId manually to avoid issues
    await User.collection.createIndex({ clerkId: 1 }, { 
      unique: true, 
      sparse: true, // Only index documents where the field exists
      background: true 
    });
    
    // Create other indexes
    await TripDetails.createIndexes();
    console.log('Indexes created');

    // Add test user if you want
    /*
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      imageUrl: 'https://example.com/avatar.png',
      subscription: 'free',
      requestsCount: 0,
      clerkId: 'test_clerk_id'
    };

    await User.findOneAndUpdate(
      { email: testUser.email },
      testUser,
      { upsert: true, new: true }
    );
    console.log('Test user created or updated');
    */

    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seed();