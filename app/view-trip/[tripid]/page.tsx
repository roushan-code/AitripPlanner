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
  const [isLoading, setIsLoading] = React.useState(true);
  //@ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

  React.useEffect(() => {
    userDetail && GetTrip();
  }, [userDetail]);

  const GetTrip = async () => {
    setIsLoading(true);
    try {
      const result = await convex.query(api?.tripDetails?.GetTripById,
        { uid: userDetail?._id, tripid: tripid + '' });
      setTripData(result);
      setTripDetailInfo(result?.tripDetails);
    } catch (error) {
      console.error('Error fetching trip details:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex flex-col lg:grid lg:grid-cols-5 gap-4 p-2 sm:p-4'>
      {isLoading ? (
        <div className='col-span-5 flex justify-center items-center h-[60vh]'>
          <div className='text-center'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]' role="status">
              <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>Loading...</span>
            </div>
            <p className='mt-2 text-gray-600'>Loading trip details...</p>
          </div>
        </div>
      ) : (
        <>
          <div className='w-full lg:col-span-3 order-2 lg:order-1'>
            <h2 className='text-xl md:text-2xl font-semibold mb-2 md:mb-4'>{tripData?.tripDetails?.destination || 'Trip Details'}</h2>
            <Itinerary />
          </div>
          <div className='w-full lg:col-span-2 h-[40vh] lg:h-auto order-1 lg:order-2'>
            <GlobalMap />
          </div>
        </>
      )}
    </div>
  )
}

export default ViewTrip