// app/api/trips/[tripId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb/connect';
import TripDetails from '@/lib/mongodb/models/TripDetails';
import User from '@/lib/mongodb/models/User';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tripId: string }> }
) {
  try {
    const { tripId } = await params;
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    await dbConnect();
    
    // Find the user in MongoDB
    const dbUser = await User.findOne({ email: session.user.email });
    
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Get the specific trip
    const trip = await TripDetails.findOne({
      tripId: tripId,
      userId: dbUser._id
    }).lean();
    
    if (!trip) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }
    
    return NextResponse.json(trip);
  } catch (error: any) {
    console.error('Error getting trip details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}