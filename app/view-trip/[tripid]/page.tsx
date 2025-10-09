'use client'
import GlobalMap from '@/app/create-new-trip/_components/GlobalMap';
import Itinerary from '@/app/create-new-trip/_components/Itinerary';
import { Trip } from '@/app/my-trips/page';
import { useTripDetail, useUserDetail, } from '@/app/provider';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React from 'react'

const ViewTrip = () => {
  const { tripid } = useParams();
  const { userDetail, setUserDetail } = useUserDetail();
  const convex = useConvex();
  const [tripData, setTripData] = React.useState<Trip>();
  //@ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

  React.useEffect(() => {
    userDetail && GetTrip();
  }, [userDetail]);

  const GetTrip = async () => {
    const result = await convex.query(api?.tripDetails?.GetTripById,
      { uid: userDetail?._id, tripid: tripid + '' });
    setTripData(result);
    setTripDetailInfo(result?.tripDetails);
  }

  return (
    <div className='grid grid-cols-5'>
      <div className='col-span-3'>
        <Itinerary />
      </div>
      <div className='col-span-2'>
        <GlobalMap />
      </div>
    </div>
  )
}

export default ViewTrip