'use client';
import { Button } from '@/components/ui/button';
import { useConvex } from 'convex/react';
import Link from 'next/link';
import React, { use, useContext } from 'react'
import { useUserDetail } from '../provider';
import { api } from '@/convex/_generated/api';
import { TripInfo } from '../create-new-trip/_components/ChatBox';
import Image from 'next/image';
import { ArrowBigRightIcon } from 'lucide-react';
import MyTripCardItem from './_components/MyTripCardItem';

export type Trip = {
    _id: string;
    tripId: string;
    tripDetails: TripInfo;
}

function MyTrips() {
    const [myTrips, setMyTrips] = React.useState<any[]>([]); // Replace 'any' with your trip type
    const { userDetail, setUserDetail } = useUserDetail();
    const convex = useConvex();

    React.useEffect(() => {
        userDetail && GetUserTrip();
    }, [userDetail]);

    const GetUserTrip = async () => {
        try {
            const result = await convex.mutation(api.tripDetails.GetUserTrip, { uid: userDetail?._id });
            setMyTrips(result);

        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    }
    return (
        <div className="p-6 border rounded-2xl flex flex-col items-center">
            <h2 className='font-bold text-3xl'>My Trips</h2>
            {myTrips?.length === 0 &&
                <h2 className='text-gray-500 mt-4 flex flex-col items-center'>
                    You have no trips yet. Start by creating a new trip!
                    <Link href={'/create-new-trip'} className='text-blue-500 underline ml-2'>
                        <Button>Create New Trip</Button>
                    </Link>
                </h2>
            }
            <div>
                {myTrips?.length > 0 &&
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
                        {myTrips.map((trip: Trip) => (
                            <MyTripCardItem key={trip._id} trip={trip} />
                        ))}
                    </div>
                }
            </div>
        </div>

    )
}

export default MyTrips