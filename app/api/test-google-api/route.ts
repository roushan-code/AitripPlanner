import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    if (!apiKey) {
        return NextResponse.json({ 
            error: 'API key not found',
            status: 'fail'
        });
    }

    // Test with the new Places API v1
    try {
        const testUrl = 'https://places.googleapis.com/v1/places:searchText';
        const requestBody = {
            textQuery: "hotel in New York",
            maxResultCount: 1
        };
        
        const response = await fetch(testUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'places.id,places.displayName,places.photos'
            },
            body: JSON.stringify(requestBody)
        });
        
        const data = await response.json();
        
        return NextResponse.json({
            status: response.ok ? 'success' : 'fail',
            statusCode: response.status,
            apiKeyPresent: !!apiKey,
            apiKeyLength: apiKey.length,
            response: response.ok ? 'API working!' : data.error?.message,
            data: response.ok ? { 
                resultsCount: data.places?.length || 0,
                hasPhotos: !!data.places?.[0]?.photos 
            } : data
        });
        
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message
        });
    }
}