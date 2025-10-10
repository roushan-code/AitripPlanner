'use client'
import React, { useEffect } from 'react'
import { Clock, ExternalLink, Ticket } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import axios from 'axios'


type Activity = {
    place_name: string;
    place_details: string;
    place_image_url: string;
    geo_coordinates: {
        latitude: number;
        longitude: number;
    };
    place_address: string;
    ticket_pricing: string;
    time_travel_each_location: string;
    best_time_to_visit: string;
}

type Props = {
    activity: Activity
}

const PlaceCardItem = ({activity}:Props) => {
    const [photoUrl, setPhotoUrl] = React.useState<string>('');
        useEffect(() => {
            activity && GetPlaceDetails();
        }, [activity]);
        const GetPlaceDetails = async() => {
            try {
                // Use free OpenStreetMap + Wikimedia instead of Google Places
                const result = await axios.post('/api/osm-place-detail', {placeName: activity?.place_name});
                
                
                // If we get a valid URL, use it; otherwise use fallback
                if (result.data && typeof result.data === 'string' && result.data.startsWith('http')) {
                    setPhotoUrl(result.data);
                } else {
                    setPhotoUrl('/travel.webp');
                }
            } catch (error) {
                console.error('❌ Error fetching place details:', error);
                setPhotoUrl('/globe.svg');
            }
        }
  return (
    <div className="border rounded-lg p-3 md:p-4 shadow-sm flex flex-col justify-between h-full">
        <img 
            src={photoUrl ? photoUrl : '/travel.webp'} 
            loading='lazy' 
            alt={activity.place_name} 
            width={400} 
            height={200} 
            className='rounded-lg h-24 sm:h-28 w-full object-cover mb-2' 
        />
        <h3 className="font-semibold text-base md:text-lg line-clamp-1">{activity?.place_name}</h3>
        <p className="text-gray-500 text-xs md:text-sm line-clamp-2 mt-1">{activity?.place_details}</p>
        <h2 className="flex items-center gap-1 md:gap-2 text-blue-500 text-xs md:text-sm pt-2 line-clamp-1">
            <Ticket className="h-4 w-4 md:h-5 md:w-5"/>
            <span>{activity?.ticket_pricing}</span>
        </h2>
        <p className="flex items-center text-xs md:text-sm pt-1 md:pt-2 gap-1 md:gap-2 text-purple-500">
            <Clock className="h-4 w-4 md:h-5 md:w-5"/> 
            <span>{activity?.time_travel_each_location}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1 md:mt-2">Best time to visit: {activity?.best_time_to_visit}</p>
        <div className="mt-auto pt-2">
            <Link href={`https://www.google.com/maps/search/?api=1&query=${activity?.place_name}`} target='_blank' className="w-full block"> 
                <Button size={'sm'} variant={'outline'} className='w-full text-xs md:text-sm'>
                    Explore More 
                    <ExternalLink className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2"/>
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default PlaceCardItem