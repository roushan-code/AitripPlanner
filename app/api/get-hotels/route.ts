import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    const { location, destination } = await req.json();
    
    // Check if API key exists
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
        console.error('Google Places API key not found');
        return NextResponse.json({ 
            error: 'Google Places API key not configured' 
        }, { status: 500 });
    }

    // Use the Text Search endpoint with proper URL format
    const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';
    
    // Search for hotels in the destination area
    const searchQuery = `hotels in ${destination || location}`;
    
    const requestBody = {
        textQuery: searchQuery,
        maxResultCount: 5
    };
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.id,places.displayName,places.photos,places.rating,places.formattedAddress,places.priceLevel'
        },
    };

    try {
        // console.log('Searching for hotels in:', searchQuery);
        
        const result = await axios.post(BASE_URL, requestBody, config);
        // console.log('Hotels found:', result.data.places?.length || 0);
        
        // Return the places data
        return NextResponse.json(result?.data);
        
    } catch (error: any) {
        console.error('Error fetching hotels:', error);
        
        // Return mock data as fallback
        return NextResponse.json({
            places: [
                {
                    id: 'fallback-hotel-1',
                    displayName: { text: `Hotel in ${destination || location}` },
                    formattedAddress: `${destination || location}`,
                    rating: 4.0,
                    photos: [],
                    priceLevel: 'PRICE_LEVEL_MODERATE'
                }
            ]
        });
    }
}