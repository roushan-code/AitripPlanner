// app/api/trips/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongodb/connect';
import TripDetails from '@/lib/mongodb/models/TripDetails';
import User from '@/lib/mongodb/models/User';

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    await dbConnect();
    
    // Find the user in MongoDB
    const dbUser = await User.findOne({ clerkId: user.id });
    
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Get all trips for this user
    const trips = await TripDetails.find({ userId: dbUser._id })
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(trips);
  } catch (error: any) {
    console.error('Error getting user trips:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}