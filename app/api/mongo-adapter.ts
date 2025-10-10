// app/api/mongo-adapter.ts
/**
 * MongoDB adapter functions to replace Convex calls
 * These functions can be used directly in components
 */
import axios from 'axios';

// Types for trip data
export type TripInfo = {
  budget: string;
  destination: string;
  duration: string;
  origin: string;
  group_size: string;
  hotels: any[];
  itinerary: any[];
};

export type UserInfo = {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  subscription: string;
  requestsCount: number;
};

export async function getUserDetails(): Promise<UserInfo | null> {
  try {
    const response = await axios.get('/api/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
}

export async function createTripDetails({ 
  tripId, 
  tripDetails 
}: { 
  tripId: string; 
  tripDetails: TripInfo;
}): Promise<{ success: boolean; tripId: string; _id: string }> {
  try {
    const response = await axios.post('/api/trips/create', {
      tripId,
      tripDetails
    });
    return response.data;
  } catch (error) {
    console.error('Error creating trip details:', error);
    throw new Error('Failed to save trip details');
  }
}

export async function getUserTrips(): Promise<any[]> {
  try {
    const response = await axios.get('/api/trips/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user trips:', error);
    return [];
  }
}

export async function getTripById(tripId: string): Promise<any> {
  try {
    const response = await axios.get(`/api/trips/${tripId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trip details:', error);
    return null;
  }
}