// app/api/trips/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongodb/connect';
import TripDetails from '@/lib/mongodb/models/TripDetails';
import User from '@/lib/mongodb/models/User';

// Helper function to validate trip details
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
  
  return sanitized;
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    const { tripId, tripDetails } = await request.json();
    
    if (!tripId || !tripDetails) {
      return NextResponse.json({ error: 'Trip ID and details are required' }, { status: 400 });
    }
    
    await dbConnect();
    
    // Find the user in MongoDB
    const dbUser = await User.findOne({ clerkId: user.id });
    
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Validate and sanitize trip details
    const sanitizedTripDetails = validateTripDetails(tripDetails);
    
    // Create the trip
    const trip = await TripDetails.create({
      tripId,
      userId: dbUser._id,
      tripDetails: sanitizedTripDetails
    });
    
    // Update user's request count
    await User.findByIdAndUpdate(dbUser._id, {
      $inc: { requestsCount: 1 },
      lastRequestDate: new Date()
    });
    
    return NextResponse.json({
      success: true,
      tripId: trip.tripId,
      _id: trip._id
    });
  } catch (error: any) {
    console.error('Error creating trip:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}