# Migration from Convex to MongoDB

This application has been migrated from Convex to MongoDB for database storage. Below are the key changes and setup instructions:

## Changes Made

1. **Removed Convex Dependencies**:
   - Removed Convex client libraries and dependencies
   - Replaced Convex schema with MongoDB schemas
   - Updated references to Convex in components

2. **Added MongoDB Integration**:
   - Created MongoDB connection utilities
   - Defined MongoDB schemas that match the previous Convex schema
   - Created REST API endpoints to replace Convex functions

3. **Updated Authentication Flow**:
   - Maintained Clerk authentication
   - Added user synchronization between Clerk and MongoDB

4. **Implemented Pricing and Rate Limiting**:
   - Added user subscription tracking
   - Implemented daily request limits for free tier users
   - Added premium plan checks with Clerk integration

## Setup Instructions

### 1. Create a MongoDB Atlas Account
- Sign up for a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas/register
- Create a new cluster (the free tier is sufficient for development)
- Set up a database user with read/write permissions
- Add your IP address to the IP access list
- Get your MongoDB connection string

### 2. Configure Environment Variables
- Copy `.env.local.example` to `.env.local`
- Add your MongoDB connection string to the `MONGODB_URI` variable
- Add your Clerk and Gemini API keys

### 3. Install Dependencies
```bash
npm install
```

### 4. Initialize the Database
```bash
npm run seed
```

### 5. Run the Development Server
```bash
npm run dev
```

## API Endpoints

The following API endpoints have been created to replace Convex functions:

- `GET /api/user` - Get current user details
- `POST /api/trips/create` - Create a new trip
- `GET /api/trips/user` - Get all trips for the current user
- `GET /api/trips/[tripId]` - Get a specific trip by ID

## Pricing Tiers

- **Free Tier**: Limited to 5 trip generations per day
- **Monthly Plan**: Unlimited trip generations

The pricing functionality is now fully implemented and works with Clerk's subscription system.

## Database Schema

The MongoDB schema maintains the same structure as the previous Convex schema, with a few enhancements:

- Added timestamps for better tracking
- Added indexes for improved query performance
- Added validation for data integrity

## Next Steps

- Consider adding a dashboard for users to manage their trips
- Implement trip sharing functionality
- Add analytics to track usage patterns