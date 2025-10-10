'use client'
import { Button } from '@/components/ui/button'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { ArrowDown, Globe2, Landmark,  LocateFixedIcon, Plane, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { use } from 'react'

export const Suggestions = [
    {
        title: "Plan a 5-day trip to Paris",
        icon: <Globe2 className='text-blue-400 h-5 w-5' />
    },
    {
        title: "Inspire me with travel ideas",
        icon: <Plane className='h-5 w-5 text-orange-400' />
    },
    {
        title: "Discover Hidden Gems ",
        icon: <Landmark className='text-emerald-500 h-5 w-5' />
    },
    {
        title: "Find Local Events",
        icon: <LocateFixedIcon className='text-teal-400 h-5 w-5' />
    }

]

const Hero = () => {
    const {user} = useUser();
    const router = useRouter();

    const onSend = () => {
        if(!user){
            router.push('/sign-in')
            return ;
        }
        // Navigate to Create trip planner page
        router.push('/create-new-trip')
    }
    return (
        <div className='mt-12 md:mt-24 flex flex-col items-center justify-center px-4 md:px-6'>
            {/* Content  */}
            <div className='flex-1 space-y-6 max-w-3xl mx-auto' >
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold w-full text-center'>
                    Hey, Let's plan your personal trip with <span className='text-primary'>AI Trip Planner</span>
                </h1>
                <p className='text-base md:text-lg text-muted-foreground w-full text-center'>
                    Plan your perfect trip with AI Trip Planner.<br className="hidden md:block" /> Get personalized itineraries, travel tips, and more at your fingertips.
                </p>
                <div>
                    <div className='flex relative border rounded-2xl p-3 md:p-4'>
                        <Textarea placeholder='Enter your destination, interests, and travel dates...' className='w-full h-16 md:h-24 bg-secondary/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none rounded-lg p-2 md:p-4 text-base md:text-lg resize-none' />
                        <Button size={'icon'} className='absolute bottom-4 right-4 md:bottom-6 md:right-6' onClick={()=>onSend()}><Send className='h-4 w-4' /></Button>
                    </div>
                </div>
                {/* Suggestion Box */}
                <div className='flex flex-wrap items-center justify-center gap-3 md:gap-6'>
                    {Suggestions.map((suggestion) => (
                        <div key={suggestion.title} className='flex items-center gap-2 bg-secondary/50 px-3 py-1.5 md:px-4 md:py-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-primary hover:text-white hover:scale-105'>
                            {suggestion.icon}
                            <p className='text-xs md:text-sm'>{suggestion.title}</p>
                        </div>
                    ))}
                </div>

                <div className='w-full flex flex-col items-center'>
                    <div className='flex justify-center'>
                        <h2 className='my-5 md:my-7 mt-10 md:mt-14 flex flex-col md:flex-row gap-1 md:gap-2 text-center items-center'>
                            <span>Not sure where to start?</span>
                            <span className="flex items-center gap-1"><strong>See How it works</strong><ArrowDown /></span>
                        </h2>
                    </div>
                    {/* Video Section */}
                    <HeroVideoDialog
                        className="block dark:hidden w-full max-w-2xl"
                        animationStyle="from-center"
                        videoSrc="https://youtu.be/6JNA-semH8o?si=hZPBmYj7qqHHHLxH"
                        thumbnailSrc="/thumbnail.png"
                        thumbnailAlt="Dummy Video Thumbnail"
                    />
                </div>
                {/* Input Box  */}
            </div>
        </div>
    )
}

export default Hero