'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

const menuOptions = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact us", href: "/contact-us" },
]

const Header = () => {
    const {user} = useUser();
    const path = usePathname();
    // console.log('Current Path:', path);
    return (
        <div className='flex justify-between items-center p-4'>
            {/* LOGO */}
            <div className='flex items-center gap-2'>
                <Image src={"/logo.svg"} alt='logo' width={30} height={30} />
                <Link href={'/'}>
                <h1 className='font-bold text-2xl hover:text-primary'>AI Trip Planner</h1>
                </Link>
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
            <div className='flex items-center gap-4'>
                {!user ? <SignInButton mode='modal'>
                    <Button className='cursor-pointer'>Get Started</Button>
                </SignInButton> : path !== '/create-new-trip' ? 
                <Link href={'/my-trips'}>
                    <Button className='cursor-pointer'>My Trips</Button>
                </Link> :
                    <Link href={'/create-new-trip'}>
                        <Button className='cursor-pointer'>Create New Trip</Button>
                    </Link>
                }
                <UserButton  />
            </div>


        </div>
    )
}

export default Header