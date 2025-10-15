// app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb/connect';
import User from '@/lib/mongodb/models/User';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    await dbConnect();
    
    // Find or create user in MongoDB
    let dbUser = await User.findOne({ email: session.user.email });
    
    if (!dbUser) {
      dbUser = await User.create({
        name: session.user.name || 'User',
        email: session.user.email,
        imageUrl: session.user.image || '',
        subscription: 'free',
        requestsCount: 0
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