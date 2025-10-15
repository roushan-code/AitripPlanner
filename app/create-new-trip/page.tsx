'use client'
import React, { useEffect } from 'react'
import ChatBox from './_components/ChatBox'
import Iternary from './_components/Itinerary'
import { useTripDetail } from '../provider'
import GlobalMap from './_components/GlobalMap'
import { Button } from '@/components/ui/button'
import { Globe2, Plane } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const CreateNewTrip = () => {
  //@ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEffect(() => {
    setTripDetailInfo(null);
  }, [])

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 lg:p-10 h-[calc(200vh-100px)] lg:h-[calc(150vh-100px)] overflow-hidden'>
      <div className=' h-[100vh] lg:h-full overflow-y-auto lg:col-span-1'>
      <ChatBox />
      </div>
      <div className='relative h-[100vh] lg:h-full overflow-y-auto lg:col-span-2'>
      {activeIndex === 0 ? <Iternary /> : <GlobalMap />}

      <Tooltip>
        <TooltipTrigger asChild>
        <Button
          size={'lg'}
          onClick={() => setActiveIndex(activeIndex === 0 ? 1 : 0)}
          className='fixed lg:absolute bg-primary hover:bg-purple-600 bottom-6 right-6 lg:left-1/2 lg:-translate-x-1/2 cursor-pointer rounded-2xl z-10'
        >
          {activeIndex === 0 ? <Plane /> : <Globe2 />}
        </Button>
        </TooltipTrigger>
        <TooltipContent className='bg-gray-800 text-white rounded-lg p-2'>
        <p>Switch Between Map and Trip Itinerary</p>
        </TooltipContent>
      </Tooltip>
      </div>
    </div>
  )
}

export default CreateNewTrip