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
    <div className='grid gird-cols-1 md:grid-cols-3 gap-5 px-10 h-max' >
      <div >
        <ChatBox />
      </div>
      <div className='col-span-3 md:col-span-2 h-[85vh] pr-0 flex items-center'>
        {activeIndex === 0 ? <Iternary /> : <GlobalMap />}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={'lg'}
              onClick={() => setActiveIndex(activeIndex === 0 ? 1 : 0)}
              className='absolute bg-primary hover:bg-purple-600 bottom-10 left-[65%] transform -translate-x-1/2 cursor-pointer rounded-2xl'
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