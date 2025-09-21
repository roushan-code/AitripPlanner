'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SignInButton, useUser } from '@clerk/nextjs'

const menuOptions = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact us", href: "/contact-us" },
]

const Header = () => {
    const {user} = useUser();
    return (
        <div className='flex justify-between items-center p-4'>
            {/* LOGO */}
            <div className='flex items-center gap-2'>
                <Image src={"/logo.svg"} alt='logo' width={30} height={30} />
                <h1 className='font-bold text-2xl hover:text-primary'>AI Trip Planner</h1>
            </div>
            {/* MENU OPTIONS */}
            <div className='flex items-center gap-6'>
                {menuOptions.map((option) => (
                    <Link key={option.name} href={option.href} className='hover:text-primary transition-colors'>
                        <h2 className='text-lg hover:scale-105 transition-all'>{option.name}</h2>
                    </Link>
                ))}
            </div>

            {/* Get Started BUTTONS */}
                {!user ? <SignInButton mode='modal'>
                    <Button className='cursor-pointer'>Get Started</Button>
                </SignInButton> :
                    <Link href={'/create-new-trip'}>
                        <Button className='cursor-pointer'>Create New Trip</Button>
                    </Link>
                }


        </div>
    )
}

export default Header