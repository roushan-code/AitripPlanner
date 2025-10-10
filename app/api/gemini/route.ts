import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { auth, currentUser } from '@clerk/nextjs/server';
import arcjet, { tokenBucket } from "@arcjet/next";

const systemPrompt = `
You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.

You must ask about the following details in order, and wait for the user's answer before asking the next:

1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)



Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.

For each response, you must return a strict JSON object with the following schema:

{
  "resp": "Your message to the user",
  "ui": "one of: groupSize, budget, TripDuration, final, or empty string if no special UI is needed"
}

- For group size questions, set "ui" to "groupSize".
- For budget questions, set "ui" to "budget".
- For trip duration questions, set "ui" to "TripDuration".
- When all information is collected and you are generating the final trip plan, set "ui" to "final".
- For all other questions, set "ui" to "" (empty string).

Never return any value for "ui" except: "groupSize", "budget", "TripDuration", "final", or "".

Return only the JSON object, with no extra text or explanation.
`

const FINAL_PROMPT = `Generate Travel Plan with given details, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, Place address, ticket Pricing, Time travel each of the location, with each day plan with best time to visit in JSON format.

IMPORTANT: For hotel_image_url and place_image_url fields:
- Do NOT use placeholder URLs like "https://example.com/..." 
- Use real, working image URLs from hotel booking sites, tourism websites, or Google Images if you know them
- If you don't have access to real image URLs, set these fields to empty strings: ""
- Never use fake or placeholder URLs

Output Schema:
 {
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}`



const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
});

// Create Arcjet instance for this route
const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      characteristics: ["userId"], // track requests by a custom user ID
      refillRate: 5, // refill 5 tokens per interval
      interval: 86400, // refill every 24 hours
      capacity: 10, // bucket maximum capacity of 10 tokens
    }),
  ],
});

export async function POST(request: NextRequest) {
    const { messages, isFinal } = await request.json();
    const user = await currentUser();
    const {has} = await auth();
    // const hasPremiumAccess = has({ plan: 'monthly' })
    // const decision = await aj.protect(request, { userId: user?.primaryEmailAddress?.emailAddress ?? '', requested: isFinal ? 5 : 0 });

    // console.log("Arcjet decision", decision);

    // if (decision.conclusion === 'DENY' && !hasPremiumAccess) {
    //     return NextResponse.json({ resp: "You have exceeded your daily limit. Please upgrade your plan.", ui: "Limit" });
    // }
    
    try {
        // Convert messages to Gemini format (only 'user' and 'model' roles allowed)
        const geminiMessages = [];
        
        // Add system prompt as first user message if it's the first message
        if (messages.length === 1 || (messages.length > 0 && messages[0].role === 'user')) {
            // First message - prepend system prompt to first user message
            geminiMessages.push({
                role: 'user',
                parts: [{ text: isFinal? FINAL_PROMPT : systemPrompt + '\n\nUser: ' + messages[0].content }]
            });
            
            // Add remaining messages with proper role conversion
            for (let i = 1; i < messages.length; i++) {
                const role = messages[i].role === 'assistant' ? 'model' : 'user';
                geminiMessages.push({
                    role: role,
                    parts: [{ text: messages[i].content }]
                });
            }
        } else {
            // Subsequent conversation - convert each message
            for (const msg of messages) {
                const role = msg.role === 'assistant' ? 'model' : 'user';
                geminiMessages.push({
                    role: role,
                    parts: [{ text: msg.content }]
                });
            }
        }
        
        // console.log('Gemini formatted messages:', JSON.stringify(geminiMessages));
        
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: geminiMessages
        });
        
        const responseText = response.text;
        // console.log('Raw Gemini response:', responseText);
        
        if (!responseText) {
            throw new Error('No response received from AI model');
        }

        let jsonResponse;
        try {
            // First try direct JSON parsing
            jsonResponse = JSON.parse(responseText);
        } catch (e) {
            // If direct parsing fails, try to extract JSON from text
            try {
                const jsonStart = responseText.indexOf('{');
                const jsonEnd = responseText.lastIndexOf('}') + 1;
                if (jsonStart === -1 || jsonEnd === -1) {
                    throw new Error('Invalid JSON response from AI');
                }
                const jsonString = responseText.substring(jsonStart, jsonEnd);
                jsonResponse = JSON.parse(jsonString);
            } catch (extractError) {
                console.error('JSON extraction failed:', extractError);
                throw new Error('Failed to extract valid JSON from response');
            }
        }
        
        // Ensure we have the expected response format
        if (!jsonResponse.resp) {
            console.error('Missing resp field in response:', jsonResponse);
            jsonResponse.resp = "I'm sorry, I couldn't generate a proper response. Please try again.";
        }
        
        // Ensure UI field is present and valid
        if (!jsonResponse.ui || !['groupSize', 'budget', 'TripDuration', 'final', ''].includes(jsonResponse.ui)) {
            jsonResponse.ui = '';
        }
        
        return NextResponse.json(jsonResponse);
    } catch (error: any) {
        console.error('Error in AI model route:', error);
        
        // Determine if it's a rate limit or quota issue
        if (error.message?.includes('quota') || error.response?.status === 429) {
            return NextResponse.json({
                resp: "The AI service is experiencing high demand. Please try again in a moment.",
                ui: '',
                error: 'Rate limit or quota exceeded'
            }, { status: 429 });
        }
        
        // Handle network errors
        if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
            return NextResponse.json({
                resp: "Connection to AI service timed out. Please try again.",
                ui: '',
                error: 'Network error: ' + error.code
            }, { status: 503 });
        }
        
        // Handle Gemini API specific errors
        if (error.response?.data?.error) {
            const errorMessage = error.response.data.error.message || 'Unknown Gemini API error';
            console.error('Gemini API error details:', error.response.data.error);
            return NextResponse.json({
                resp: "The AI service encountered an issue. Please try again later.",
                ui: '',
                error: errorMessage
            }, { status: error.response.status || 500 });
        }
        
        // Generic error fallback
        return NextResponse.json({
            resp: "I'm sorry, there was an error processing your request. Please try again later.",
            ui: '',
            error: error.message || 'Failed to get response from AI model'
        }, { status: 500 });
    }
}