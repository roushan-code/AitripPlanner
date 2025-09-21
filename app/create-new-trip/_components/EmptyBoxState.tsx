import { Suggestions } from '@/app/_components/Hero'
import React from 'react'

const EmptyBoxState = ({onSelectOption}:any) => {
    
    return (
        <div className='mt-7'>
            <h2 className='font-bold text-3xl text-center'>Start Planning new <strong className='text-primary'>Trip </strong>Using Ai</h2>
            <p className='test-center text-gray-400 mt-2'>
                Discover exciting destinations, personalized itineraries, and travel tips with our AI-powered trip planner. Start your adventure today! Let's our AI help you plan your next unforgettable journey.
            </p>
            <div className='flex flex-col items-center justify-center gap-3 mt-4'>
                {Suggestions.map((suggestion) => (
                    <div key={suggestion.title}
                    onClick={()=>onSelectOption(suggestion.title)}
                     className='flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:border-1 hover:border-primary hover:text-black hover:scale-105'>
                        {suggestion.icon}
                        <p className='text-sm'>{suggestion.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EmptyBoxState