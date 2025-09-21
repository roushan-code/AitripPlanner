
import React from 'react'
import ChatBox from './_components/ChatBox'
import Iternary from './_components/Itinerary'

const CreateNewTrip = () => {
  return (
    <div className='grid gird-cols-1 md:grid-cols-3 gap-5 px-10 h-[85vh]' >
        <div>
            <ChatBox />
        </div>
        <div className='md:col-span-2 overflow-y-scroll h-[85vh] pr-5'>
            <Iternary />
        </div>
    </div>
  )
}

export default CreateNewTrip