// app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongodb/connect';
import User from '@/lib/mongodb/models/User';

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    await dbConnect();
    
    // Find or create user in MongoDB
    let dbUser = await User.findOne({ clerkId: user.id });
    
    if (!dbUser) {
      dbUser = await User.create({
        name: user.firstName + ' ' + user.lastName,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
        clerkId: user.id,
        subscription: 'free'
      });
    }
    
    return NextResponse.json({
      _id: dbUser._id,
      name: dbUser.name,
      email: dbUser.email,
      imageUrl: dbUser.imageUrl,
      subscription: dbUser.subscription,
      requestsCount: dbUser.requestsCount
    });
  } catch (error: any) {
    console.error('Error in user API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}