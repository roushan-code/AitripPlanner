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
    { name: "Contact us", href: "/contact" },
]

const Header = () => {
    const {user} = useUser();
    const path = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    
    return (
        <div className='relative flex flex-wrap justify-between items-center p-4'>
            {/* LOGO */}
            <div className='flex items-center gap-2 z-10'>
                <Image src={"/logo.svg"} alt='logo' width={30} height={30} />
                <Link href={'/'}>
                <h1 className='font-bold text-xl md:text-2xl hover:text-primary'>AI Trip Planner</h1>
                </Link>
            </div>
            
            {/* Mobile Menu Toggle */}
            <div className='md:hidden z-10'>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                    {mobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>
            
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                    <div className='flex flex-col items-center gap-6 mb-8'>
                        {menuOptions.map((option) => (
                            <Link key={option.name} href={option.href} className='hover:text-primary transition-colors' onClick={() => setMobileMenuOpen(false)}>
                                <h2 className='text-lg hover:scale-105 transition-all'>{option.name}</h2>
                            </Link>
                        ))}
                    </div>
                    
                    <div className='flex flex-col items-center gap-4'>
                        {!user ? <SignInButton mode='modal'>
                            <Button className='cursor-pointer w-full' onClick={() => setMobileMenuOpen(false)}>Get Started</Button>
                        </SignInButton> : path !== '/create-new-trip' ? 
                        <Link href={'/my-trips'} onClick={() => setMobileMenuOpen(false)}>
                            <Button className='cursor-pointer'>My Trips</Button>
                        </Link> :
                            <Link href={'/create-new-trip'} onClick={() => setMobileMenuOpen(false)}>
                                <Button className='cursor-pointer'>Create New Trip</Button>
                            </Link>
                        }
                    </div>
                </div>
            )}
            
            {/* MENU OPTIONS - Desktop */}
            <div className='hidden md:flex items-center gap-6'>
                {menuOptions.map((option) => (
                    <Link key={option.name} href={option.href} className='hover:text-primary transition-colors'>
                        <h2 className='text-lg hover:scale-105 transition-all'>{option.name}</h2>
                    </Link>
                ))}
            </div>

            {/* Get Started BUTTONS - Desktop */}
            <div className='hidden md:flex items-center gap-4'>
                {!user ? <SignInButton mode='modal'>
                    <Button className='cursor-pointer'>Get Started</Button>
                </SignInButton> : (path === '/create-new-trip' || path === '/my-trips')  ? 
                    <Link href={'/create-new-trip'}>
                        <Button className='cursor-pointer'>Create New Trip</Button>
                    </Link> : 
                    <Link href={'/my-trips'}>
                    <Button className='cursor-pointer'>My Trips</Button>
                </Link>
                }
                <UserButton />
            </div>
            
            {/* Mobile UserButton */}
            <div className={`${mobileMenuOpen ? 'hidden' : 'block'} md:hidden z-10`}>
                <UserButton />
            </div>
        </div>
    )
}

export default Header