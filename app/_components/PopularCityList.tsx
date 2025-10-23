"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Users, Star } from "lucide-react";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full pt-10 md:pt-20 px-2 md:px-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mb-4">
            🌍 Popular Trip Destinations
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover amazing destinations with our AI-powered trip recommendations. 
            Each destination comes with personalized itineraries, budget estimates, and insider tips.
          </p>
        </div>
        <Carousel items={cards} />
      </div>
    </div>
  );
}

const TripContent = ({ destination, itinerary, budget, duration, highlights }: {
  destination: string;
  itinerary: string[];
  budget: string;
  duration: string;
  highlights: string[];
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-800 dark:to-neutral-900 p-8 md:p-14 rounded-3xl mb-4">
      {/* Trip Overview */}
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          ✈️ {destination} Trip Plan
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 p-3 rounded-lg">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Duration</p>
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">{duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 p-3 rounded-lg">
            <DollarSign className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Budget</p>
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">{budget}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 p-3 rounded-lg">
            <Star className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Rating</p>
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">4.8/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Itinerary */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
          📅 Suggested Itinerary
        </h4>
        <div className="space-y-3">
          {itinerary.map((day, index) => (
            <div key={index} className="flex items-start gap-3 bg-white dark:bg-neutral-800 p-4 rounded-lg">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div>
                <p className="font-semibold text-neutral-800 dark:text-neutral-200">Day {index + 1}</p>
                <p className="text-neutral-600 dark:text-neutral-400">{day}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Must-Visit Highlights */}
      <div className="mb-6">
        <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
          🏛️ Must-Visit Highlights
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-2 bg-white dark:bg-neutral-800 p-3 rounded-lg">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="text-neutral-700 dark:text-neutral-300">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
          Plan My {destination} Trip
        </Button>
      </div>
    </div>
  );
};

const data = [
  {
    category: "Paris, France",
    title: "🗼 Romance & Culture – 7-Day Paris Adventure",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
    content: <TripContent 
      destination="Paris"
      duration="7 Days"
      budget="$2,500 - $3,500"
      itinerary={[
        "Arrival & Eiffel Tower visit, Seine River cruise",
        "Louvre Museum & Tuileries Garden, Champs-Élysées shopping",
        "Montmartre & Sacré-Cœur, artist district exploration",
        "Versailles Palace day trip, gardens & fountains",
        "Notre-Dame area, Latin Quarter, Seine island hopping",
        "Marais district, vintage shopping, food markets",
        "Arc de Triomphe, departure from Charles de Gaulle"
      ]}
      highlights={[
        "Eiffel Tower & Trocadéro Views",
        "Louvre Museum & Mona Lisa",
        "Montmartre & Artists' Square",
        "Versailles Palace & Gardens",
        "Seine River Cruise",
        "French Cuisine & Wine Tasting"
      ]}
    />,
  },
  {
    category: "New York, USA",
    title: "🏙️ The Big Apple – 6-Day Urban Explorer",
    src: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <TripContent 
      destination="New York"
      duration="6 Days"
      budget="$3,000 - $4,000"
      itinerary={[
        "Times Square, Broadway show, high-line walk",
        "Central Park, Metropolitan Museum, Upper East Side",
        "Statue of Liberty, Ellis Island, 9/11 Memorial",
        "Brooklyn Bridge, DUMBO, Williamsburg exploration",
        "MoMA, Rockefeller Center, Top of the Rock",
        "Shopping in SoHo, Chinatown, Little Italy food tour"
      ]}
      highlights={[
        "Times Square & Broadway Shows",
        "Central Park & Museums",
        "Statue of Liberty & Ellis Island",
        "Brooklyn Bridge & Views",
        "Empire State Building",
        "Food Tours & Rooftop Bars"
      ]}
    />,
  },
  {
    category: "Tokyo, Japan",
    title: "🌸 Modern Meets Traditional – 8-Day Japan Journey",
    src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <TripContent 
      destination="Tokyo"
      duration="8 Days"
      budget="$2,800 - $3,800"
      itinerary={[
        "Shibuya Crossing, Harajuku, Omeando Hills shopping",
        "Asakusa Temple, traditional Tokyo, Sumida River",
        "Tsukiji Fish Market, sushi breakfast, Ginza district",
        "Day trip to Mount Fuji & Hakone hot springs",
        "Meiji Shrine, Yoyogi Park, cherry blossom viewing",
        "Akihabara electronics, anime culture, maid cafes",
        "Imperial Palace, East Gardens, traditional tea ceremony",
        "Last-minute shopping in Shinjuku, departure"
      ]}
      highlights={[
        "Shibuya Crossing Experience",
        "Traditional Temples & Shrines",
        "Mount Fuji Day Trip",
        "Authentic Sushi & Ramen",
        "Cherry Blossom Season",
        "Anime & Pop Culture Districts"
      ]}
    />,
  },
  {
    category: "Rome, Italy",
    title: "🏛️ Ancient Wonders – 6-Day Historical Journey",
    src: "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <TripContent 
      destination="Rome"
      duration="6 Days"
      budget="$2,200 - $3,200"
      itinerary={[
        "Colosseum tour, Roman Forum, Palatine Hill exploration",
        "Vatican City, St. Peter's Basilica, Sistine Chapel",
        "Pantheon, Trevi Fountain, Spanish Steps walking tour",
        "Tivoli day trip, Villa d'Este gardens, Hadrian's Villa",
        "Trastevere neighborhood, authentic Roman cuisine",
        "Castel Sant'Angelo, Piazza Navona, farewell dinner"
      ]}
      highlights={[
        "Colosseum & Roman Forum",
        "Vatican City & Sistine Chapel",
        "Trevi Fountain & Pantheon",
        "Authentic Italian Cuisine",
        "Tivoli Gardens Day Trip",
        "Historic Trastevere District"
      ]}
    />,
  },
  {
    category: "Dubai, UAE",
    title: "🏜️ Luxury & Adventure – 5-Day Desert Oasis",
    src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <TripContent 
      destination="Dubai"
      duration="5 Days"
      budget="$2,000 - $4,000"
      itinerary={[
        "Burj Khalifa, Dubai Mall, fountain show, luxury dining",
        "Palm Jumeirah, Atlantis resort, waterpark adventure",
        "Desert safari, camel riding, traditional Bedouin camp",
        "Dubai Marina, yacht cruise, beach relaxation",
        "Gold & Spice Souks, Dubai Creek, cultural district"
      ]}
      highlights={[
        "Burj Khalifa & Observation Deck",
        "Luxury Shopping & Malls",
        "Desert Safari & Camel Rides",
        "Palm Jumeirah & Atlantis",
        "Traditional Souks & Markets",
        "Yacht Cruises & Beach Resorts"
      ]}
    />,
  },
  {
    category: "Mumbai, India",
    title: "🇮🇳 Bollywood & Culture – 7-Day India Experience",
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3xxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <TripContent 
      destination="Mumbai"
      duration="7 Days"
      budget="$1,200 - $2,000"
      itinerary={[
        "Gateway of India, Taj Hotel, Colaba Causeway exploration",
        "Bollywood studio tour, Film City, celebrity spotting",
        "Elephanta Caves boat trip, ancient rock sculptures",
        "Crawford Market, street food tour, local spices",
        "Marine Drive sunset, Chowpatty Beach, local culture",
        "Dharavi slum tour (optional), local artisan workshops",
        "Last-minute shopping, Linking Road, departure"
      ]}
      highlights={[
        "Gateway of India & Taj Hotel",
        "Bollywood Studios & Film City",
        "Elephanta Caves Heritage Site",
        "Authentic Street Food Tours",
        "Marine Drive & Beaches",
        "Local Markets & Artisan Crafts"
      ]}
    />,
  },
];

