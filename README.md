# AI Trip Planner

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) that uses MongoDB for database storage and Gemini API for AI trip planning.

## Getting Started

1. Set up environment variables by copying `.env.local.example` to `.env.local` and filling in your credentials:

```bash
# Required environment variables
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_MAPBOX_API_KEY=your_mapbox_api_key
```

2. Install dependencies and run the development server:

```bash
npm install
npm run dev
```

3. (Optional) Seed the database with initial data:

```bash
npm run seed
```

<!-- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


<div className="flex flex-col justify-between border rounded-lg p-4 shadow-sm cursor-pointer min-w-[280px]">
            <img 
                src={hotel.hotel_image_url} 
                alt={hotel.hotel_name} 
                width={400} 
                height={200} 
                className='rounded-lg h-28 object-cover' 
                onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-hotel.jpg';
                }}
            />
            <h2 className='font-semibold text-lg mt-2'>{hotel?.hotel_name}</h2>
            <h2 className='text-sm text-gray-500'>{hotel?.hotel_address}</h2>
            <h2 className='flex text-sm text-green-500'>
                <Wallet width={17}/> {hotel?.price_per_night} / night
            </h2>
            <div className='flex items-center mt-2'>
                <span className='text-yellow-500'>{"★".repeat(Math.floor(hotel.rating))}</span>
                <span className='text-gray-500 ml-2'>{hotel.rating} / 5</span>
            </div>
            <Link href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotel_name + ' ' + hotel?.hotel_address)}`} target='_blank'>
                <Button className='mt-2 w-full'>Book Now</Button>
            </Link>
        </div> -->