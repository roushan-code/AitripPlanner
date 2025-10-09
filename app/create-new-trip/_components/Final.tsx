import React from 'react'

const Final = ({viewTrip, disable}:any) => {
  return (
    <div className="flex flex-col items-center mt-2 p-4 border rounded-2xl bg-white" >
        <div className="text-4xl mb-4">🛫✨</div>
        <h2 className="text-lg font-semibold mb-2">Planning your dream trip...</h2>
        <p className="text-gray-600">
            Gathering best destinations, activities, and accommodations tailored just for you. Get ready for an unforgettable adventure!
        </p>
        <button disabled={disable} className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition">
            View Trip Details
        </button>
        <h3 className='text-xs font-semibold mb-2'>Wait upto 2-3 minutes untill loading is complete</h3>
    </div>
  )
}

export default Final