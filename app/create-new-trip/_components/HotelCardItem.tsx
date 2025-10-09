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
    <div className="flex flex-col justify-between border rounded-lg p-4 shadow-sm cursor-pointer min-w-[280px] overflow-scroll">
        <img src={photoUrl ? photoUrl : '/travel.webp'} loading='lazy' alt={hotel.hotel_name} width={400} height={200}  className='rounded-lg h-28 object-cover'  />
        <h2 className='font-semibold text-lg mt-2'>{hotel?.hotel_name}</h2>
        <h2 className='text-sm text-gray-500'>{hotel?.hotel_address}</h2>
        <h2 className='flex text-sm text-green-500'><Wallet width={17}/>: {hotel?.price_per_night} / night</h2>
        <div className='flex items-center mt-2'>
            <span className='text-yellow-500'>{"★".repeat(Math.floor(hotel.rating))}</span>
            <span className='text-gray-500 ml-2'>{hotel.rating} / 5</span>
        </div>
        <Link href={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotel_name}`} target='_blank' >
            <Button className='mt-2 w-full'>Book Now</Button>
        </Link>
    </div>
  )
}

export default HotelCardItem