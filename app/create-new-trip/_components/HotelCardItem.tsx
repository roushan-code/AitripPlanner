'use client'
import React, { useEffect } from 'react'
import { Hotel } from './ChatBox'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'
import axios from 'axios'

type Props = {
    hotel: Hotel
}
const HotelCardItem =  ({ hotel }: Props) => {
    const [photoUrl, setPhotoUrl] = React.useState<string>('');
    useEffect(() => {
        hotel && GetPlaceDetails();
    }, [hotel]);
    // console.log('Hotel Data:', hotel?.hotel_name);
    const GetPlaceDetails = async() => {
        try {
            // Use free OpenStreetMap + Wikimedia instead of Google Places
            const result = await axios.post('/api/osm-place-detail', {placeName: hotel?.hotel_name});
            
            // console.log('OSM Place Details for', hotel?.hotel_name, ':', result.data);
            
            // If we get a valid URL, use it; otherwise use fallback
            if (result.data && typeof result.data === 'string' && result.data.startsWith('http')) {
                setPhotoUrl(result.data);
                // console.log('✅ Image found:', result.data);
            } else {
                setPhotoUrl('/travel.webp');
                // console.log('ℹ️ No image found, using fallback icon');
            }
        } catch (error) {
            console.error('❌ Error fetching hotel details:', error);
            setPhotoUrl('/globe.svg');
        }
    }
        
        
    return (
    <div className="flex flex-col justify-between border rounded-lg p-3 md:p-4 shadow-sm cursor-pointer w-full h-full overflow-hidden">
        <img 
            src={photoUrl ? photoUrl : '/travel.webp'} 
            loading='lazy' 
            alt={hotel.hotel_name} 
            width={400} 
            height={200}  
            className='rounded-lg h-24 sm:h-28 w-full object-cover'  
        />
        <h2 className='font-semibold text-base md:text-lg mt-2 line-clamp-1'>{hotel?.hotel_name}</h2>
        <h2 className='text-xs md:text-sm text-gray-500 line-clamp-2'>{hotel?.hotel_address}</h2>
        <h2 className='flex items-center text-xs md:text-sm text-green-500 mt-1'><Wallet className="h-3 w-3 md:h-4 md:w-4 mr-1"/>: {hotel?.price_per_night} / night</h2>
        <div className='flex items-center mt-1 md:mt-2'>
            <span className='text-yellow-500 text-xs md:text-sm'>{"★".repeat(Math.floor(hotel.rating))}</span>
            <span className='text-gray-500 ml-1 md:ml-2 text-xs md:text-sm'>{hotel.rating} / 5</span>
        </div>
        <Link href={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotel_name}`} target='_blank' className="mt-auto">
            <Button className='mt-2 w-full text-xs md:text-sm' size="sm">Book Now</Button>
        </Link>
    </div>
  )
}

export default HotelCardItem