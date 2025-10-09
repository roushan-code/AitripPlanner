import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { placeName } = await req.json();
    
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
    
    
    
    const requestBody = {
        textQuery: placeName,
        maxResultCount: 3  // Increased to get more results
    };
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.id,places.displayName,places.photos,places.rating,places.formattedAddress,places.priceLevel'
        },
    };

    try {
        // console.log('Making request to:', BASE_URL);
        // console.log('Request body:', JSON.stringify(requestBody));
        // console.log('Headers:', JSON.stringify(config.headers, null, 2));

        const result = await axios.post(BASE_URL, requestBody, config);
        // console.log('Success! Response:', result.data);

        // Check if we have places and photos
        if (result.data?.places?.[0]?.photos?.[0]?.name) {
            const placeRefName = result.data.places[0].photos[0].name;
            const PhotoRefUrl = `https://places.googleapis.com/v1/${placeRefName}/media?maxHeightPx=500&maxWidthPx=500&key=${apiKey}`;
            return NextResponse.json(PhotoRefUrl);
        } else {
            // No photos found, return empty string
            // console.log('No photos found for place:', placeName);
            return NextResponse.json('');
        }
    } catch (error: any) {
        console.error('Google Places API Error:', error.response?.data || error.message);
        
        // Return empty string instead of error for graceful degradation
        return NextResponse.json('');
    }
}