import React from 'react'
import { Timeline } from "@/components/ui/timeline";
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const trip_data = {
  destination: "Gangtok, Sikkim",
  duration: "2 Days",
  origin: "Kolkata",
  budget: "Moderate",
  group_size: "1 (Solo)",
  hotels: [
    {
      hotel_name: "Hotel Sonam Delek",
      hotel_address: "Near Sikkim Tourism Centre, Zero Point, Gangtok, Sikkim 737101",
      price_per_night: "INR 3500 - 4500",
      hotel_image_url: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=414x232",
      geo_coordinates: {
        latitude: 27.3275,
        longitude: 88.614
      },
      rating: 4,
      description: "A well-regarded hotel offering comfortable rooms, good service, and an excellent location close to the main market area, making it easy to access restaurants and nightlife. Features include a restaurant and often good views of the surrounding hills."
    },
    {
      hotel_name: "Hotel Suhim Portico",
      hotel_address: "Upper Sichey, Ranka Road, Gangtok, Sikkim 737101",
      price_per_night: "INR 4000 - 5000",
      hotel_image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYFGrC3FABTZgrupZ4BwclRTi_wL_8OIxQtw&s",
      geo_coordinates: {
        latitude: 27.3256,
        longitude: 88.6175
      },
      rating: 4.2,
      description: "A slightly more upscale moderate option, Hotel Suhim Portico offers modern amenities, spacious rooms, and often boasts great views of Gangtok valley. It's a short drive or pleasant walk from MG Marg, providing a balance of accessibility and tranquility. Known for its hospitality and in-house dining options."
    }
  ],
  itinerary: [
    {
      day: 1,
      day_plan: "Arrival in Gangtok, explore MG Marg for local food, dinner & nightlife.",
      best_time_to_visit_day: "Afternoon & Evening",
      activities: [
        {
          place_name: "Travel from Bagdogra Airport (IXB) to Gangtok",
          place_details: "Upon arrival at Bagdogra Airport (IXB) from Kolkata, take a pre-booked taxi or shared cab to Gangtok. The scenic drive takes about 4-5 hours, winding through picturesque landscapes. Check into your chosen hotel upon arrival.",
          place_image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDC8qDL2jZsCo6qQBVujL5yv6KSftPUJEOiw&s",
          geo_coordinates: {
            latitude: 27.33,
            longitude: 88.614
          },
          place_address: "Bagdogra Airport to Gangtok",
          ticket_pricing: "INR 3000-4000 (private taxi), INR 500-700 (shared cab)",
          time_travel_each_location: "4-5 hours",
          best_time_to_visit: "Morning (to reach Gangtok by afternoon)"
        },
        {
          place_name: "MG Marg (Mahatma Gandhi Marg)",
          place_details: "The heart of Gangtok, MG Marg is a pedestrian-only boulevard lined with shops, restaurants, cafes, and benches. It's a great place to soak in the local atmosphere, try street food, and browse for souvenirs. Spend your afternoon exploring the various eateries and enjoying the vibrant ambiance.",
          place_image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdaP6wX8lAiaLkLD-tp9fOFCDQMAj6Ccb5jA&s",
          geo_coordinates: {
            latitude: 27.3297,
            longitude: 88.6151
          },
          place_address: "MG Marg, Gangtok, Sikkim",
          ticket_pricing: "Free (exploration), Varies (food/shopping)",
          time_travel_each_location: "2-3 hours",
          best_time_to_visit: "Late afternoon to early evening"
        },
        {
          place_name: "Local Dinner & Food Exploration",
          place_details: "Indulge in authentic Sikkimese cuisine. Try momos, thukpa, phaley, and other local delicacies. Explore restaurants like The Square or Taste of Tibet for a sit-down meal, or continue with street food exploration around MG Marg. Don't miss trying local Sikkimese tea.",
          place_image_url: "https://www.esikkimtourism.in/wp-content/uploads/2019/03/gangtok-tour-boxx.jpg",
          geo_coordinates: {
            latitude: 27.329,
            longitude: 88.6145
          },
          place_address: "Various restaurants and stalls around MG Marg",
          ticket_pricing: "INR 500-1000 per meal",
          time_travel_each_location: "1.5-2 hours",
          best_time_to_visit: "Evening"
        },
        {
          place_name: "Gangtok Nightlife - Pub Hopping",
          place_details: "Experience Gangtok's emerging nightlife. Head to popular pubs like Cafe Live & Loud or Pub 25, both located on or near MG Marg. Enjoy live music, a lively atmosphere, and a selection of local and international beverages. It's a great way to unwind and meet fellow travelers.",
          place_image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4CRfiFVEKPFDFtutfRF8jLOQqq2nZGRe9w&s",
          geo_coordinates: {
            latitude: 27.3305,
            longitude: 88.6158
          },
          place_address: "Various pubs around MG Marg",
          ticket_pricing: "Varies (drinks, entry if any)",
          time_travel_each_location: "2-3 hours",
          best_time_to_visit: "Late Evening"
        }
      ]
    },
    {
      day: 2,
      day_plan: "Morning sight-seeing, cafe hopping, souvenir shopping, and departure from Gangtok.",
      best_time_to_visit_day: "Morning & Afternoon",
      activities: [
        {
          place_name: "Ganesh Tok",
          place_details: "Start your day with a visit to Ganesh Tok, a small temple dedicated to Lord Ganesha. Perched on a hill, it offers panoramic views of Gangtok town, the Kanchenjunga range, and the surrounding valleys. It's a quick and rewarding stop for scenic beauty.",
          place_image_url: "https://example.com/images/ganesh_tok.jpg",
          geo_coordinates: {
            latitude: 27.3338,
            longitude: 88.5991
          },
          place_address: "Ganesh Tok Road, Gangtok, Sikkim 737101",
          ticket_pricing: "Free",
          time_travel_each_location: "1 hour (including travel)",
          best_time_to_visit: "Morning (for clear views)"
        },
        {
          place_name: "Enchey Monastery",
          place_details: "A historically significant and revered monastery, Enchey Monastery belongs to the Nyingma order of Vajrayana Buddhism. Its architecture is beautiful, and the serene environment offers a glimpse into Buddhist culture. It's a short drive from Ganesh Tok.",
          place_image_url: "https://example.com/images/enchey_monastery.jpg",
          geo_coordinates: {
            latitude: 27.3204,
            longitude: 88.6158
          },
          place_address: "Gangtok, Sikkim 737101",
          ticket_pricing: "Free (donations welcome)",
          time_travel_each_location: "1-1.5 hours (including travel)",
          best_time_to_visit: "Morning"
        },
        {
          place_name: "Lunch & Cafe Hopping",
          place_details: "Head back to MG Marg or a nearby area for lunch. Explore some of Gangtok's charming cafes for a relaxed afternoon. Cafe Fiction, Baker's Cafe, or The Coffee Shop offer delicious snacks, coffee, and light meals. It's a great way to enjoy the atmosphere and perhaps read a book.",
          place_image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4CRfiFVEKPFDFtutfRF8jLOQqq2nZGRe9w&s",
          geo_coordinates: {
            latitude: 27.3295,
            longitude: 88.615
          },
          place_address: "Various cafes around MG Marg",
          ticket_pricing: "INR 300-700 per person",
          time_travel_each_location: "1.5-2 hours",
          best_time_to_visit: "Late morning to afternoon"
        },
        {
          place_name: "Souvenir Shopping & Departure Preparation",
          place_details: "Spend your final hour or two picking up souvenirs from local shops on MG Marg. Look for traditional Sikkimese handicrafts, prayer flags, local teas, and unique apparel. Afterwards, head to the taxi stand for your pre-booked cab back to Bagdogra Airport for your flight to Kolkata.",
          place_image_url: "https://example.com/images/sikkim_souvenirs.jpg",
          geo_coordinates: {
            latitude: 27.3297,
            longitude: 88.6151
          },
          place_address: "MG Marg, Gangtok, Sikkim",
          ticket_pricing: "Varies based on purchases",
          time_travel_each_location: "1-2 hours (shopping) + 4-5 hours (travel to airport)",
          best_time_to_visit: "Afternoon"
        }
      ]
    }
  ]
};

const Itinerary = () => {
  const data = [
    {
      title: "Recommanded Hotels",
      content: (
        <div className='flex gap-2'>
          {trip_data.hotels.map((hotel, index) => (
            <div key={index} className="flex flex-col justify-between border rounded-lg p-4 shadow-sm cursor-pointer">
              <img src={hotel.hotel_image_url} alt={hotel.hotel_name} width={400} height={200} className='rounded-lg h-28' />
              <h2 className='font-semibold text-lg'>{hotel?.hotel_name}</h2>
              <h2 className='text-sm text-gray-500'>{hotel?.hotel_address}</h2>
              <h2 className='text-sm text-gray-500'>Price: {hotel?.price_per_night} / night</h2>
              <div className='flex items-center mt-2'>
                <span className='text-yellow-500'>{"★".repeat(Math.floor(hotel.rating))}</span>
                <span className='text-gray-500 ml-2'>{hotel.rating} / 5</span>
              </div>
              <Button className='mt-2 w-full'>Book Now</Button>
            </div>

          ))}
        </div>
      ),
    },
    {
      title: `Day ${trip_data.itinerary[0].day}`,
      content: (
        <div>
          <p className="mb-4 text-lg font-medium text-neutral-800 md:text-xl dark:text-neutral-200">
            {trip_data.itinerary[0].day_plan}
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-700 md:text-sm dark:text-neutral-300">
            Best time to visit: {trip_data.itinerary[0].best_time_to_visit_day}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trip_data.itinerary[0].activities.map((activity, idx) => (
              <div key={idx} className="border rounded-lg p-4 shadow-sm">
                <img src={activity?.place_image_url} alt={activity.place_name} width={400} height={200} className='rounded-lg h-28 mb-2' />
                <h3 className="font-bold mb-2">{activity.place_name}</h3>
                <p className="text-sm mb-3">{activity.place_details}</p>
                <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                  ⏰ Best time: {activity.best_time_to_visit}
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                  💲 {activity.ticket_pricing}
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                  📍 {activity.place_address}
                </div>
              </div>
            ))}
          </div>
        </div>
                    
      ),
    },
    {
      title: "Changelog",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Deployed 5 new components on Aceternity today
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Card grid component
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Startup template Aceternity
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Random file upload lol
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Himesh Reshammiya Music CD
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Salman Bhai Fan Club registrations open
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} tripData={trip_data} />
    </div>
  );
}

export default Itinerary