import React, { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useTripDetail } from '@/app/provider';

const GlobalMap = () => {
    const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [isMapLoading, setIsMapLoading] = useState<boolean>(true);
    //@ts-ignore
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

    // Initialize map when component mounts
    useEffect(() => {
        if (mapContainerRef.current) {
            mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || '';
            const mapInstance = new mapboxgl.Map({
                container: mapContainerRef.current, // container ID
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                center: [-74.5, 40], // starting position [lng, lat]
                zoom: 1.7, // starting zoom
                projection: 'globe' // display the map as a 3D globe
            });

            mapInstance.on('load', () => {
                setIsMapLoading(false);
            });

            setMap(mapInstance);

            // Cleanup function to remove map on unmount
            return () => {
                mapInstance.remove();
            };
        }
    }, []);

    // Add markers when trip details change
    useEffect(() => {
        if (!map || !tripDetailInfo) return;

        const markers: mapboxgl.Marker[] = [];

        tripDetailInfo.itinerary?.forEach((itinerary: any) => {
            itinerary.activities?.forEach((activity: any) => {
                if (activity?.geo_coordinates?.longitude && activity?.geo_coordinates?.latitude) {
                    const marker = new mapboxgl.Marker({ color: 'red' })
                        .setLngLat([activity.geo_coordinates.longitude, activity.geo_coordinates.latitude])
                        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${activity.place_name}</h3>`))
                        .addTo(map);
                    markers.push(marker);
                    map.flyTo({
                        center: [activity.geo_coordinates.longitude, activity.geo_coordinates.latitude],
                        zoom: 8,
                        essential: true // this animation is considered essential with respect to prefers-reduced-motion
                    });
                }
            });
        });

        // Cleanup markers when component updates
        return () => {
            markers.forEach(marker => marker.remove());
        };
    }, [tripDetailInfo, map]);

    return (
        <div className="h-full relative">
            {isMapLoading && (
                <div className='absolute inset-0 flex items-center justify-center z-10 bg-gray-100/70 rounded-lg'>
                    <div className='text-center'>
                        <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]' role="status">
                            <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>Loading map...</span>
                        </div>
                        <p className='mt-2 text-gray-600 font-medium'>Loading map...</p>
                    </div>
                </div>
            )}
            <div id='map' ref={mapContainerRef} className='w-full h-[40vh] lg:h-[85vh] border-2 rounded-lg'>
            </div>
        </div>
    );
};

export default GlobalMap;