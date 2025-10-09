'use client'
import React, { useEffect } from 'react'
import Image from 'next/image';
import { ArrowBigRightIcon } from 'lucide-react';
import { Trip } from '../page';
import axios from 'axios';
import Link from 'next/link';

type Props = {
    trip: Trip
}

const MyTripCardItem = ({ trip }: Props) => {
    const [photoUrl, setPhotoUrl] = React.useState<string>('');
        useEffect(() => {
            trip && GetPlaceDetails();
        }, [trip]);
        const GetPlaceDetails = async() => {
            try {
                // Use free OpenStreetMap + Wikimedia instead of Google Places
                const result = await axios.post('/api/osm-place-detail', {placeName: trip?.tripDetails?.destination});
                
                // console.log('OSM Place Details for', trip?.tripDetails?.destination, ':', result.data);
                
                // If we get a valid URL, use it; otherwise use fallback
                if (result.data && typeof result.data === 'string' && result.data.startsWith('http')) {
                    setPhotoUrl(result.data);
                    // console.log('✅ Image found:', result.data);
                } else {
                    setPhotoUrl('/travel.webp');
                    // console.log('ℹ️ No image found, using fallback icon');
                }
            } catch (error) {
                console.error('❌ Error fetching place details:', error);
                setPhotoUrl('/globe.svg');
            }
        }
    return (
        <Link href={'/view-trip/'+trip?.tripId}  className='border p-4 rounded-lg shadow-sm' key={trip._id}>
            <Image src={photoUrl? photoUrl : '/travel.webp'} alt='trip.tripId' width={400} height={400} loading='lazy' className='rounded-xl object-cover w-full h-[270px]' />
            <h3 className='flex font-semibold text-xl gap-2 mt-2'>
                {trip.tripDetails.origin}
                <ArrowBigRightIcon />
                {trip.tripDetails.destination}
            </h3>
            <h2 className='mt-2 text-gray-500'>{trip?.tripDetails?.duration} Trip with {trip?.tripDetails.budget}</h2>
        </Link>
    )
}

export default MyTripCardItem