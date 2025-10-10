'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader, Send } from 'lucide-react'
import React, { useEffect } from 'react'
import EmptyBoxState from './EmptyBoxState'
import GroupSizeUi from './GroupSizeUi'
import BudgetUi from './BudgetUi'
import SelectDays from './SelectDays'
import Final from './Final'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUserDetail, useTripDetail } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid';

type Message = {
    role: string;
    content: string;
    ui?: string;
}

export type TripInfo = {
    budget: string;
    destination: string;
    duration: string;
    origin: string;
    group_size: string;
    hotels: any;
    itinerary: any;
}

export type Hotel = {
    hotel_name: string;
    hotel_address: string;
    price_per_night: string;
    hotel_image_url: string;
    geo_coordinates: {
        latitude: number;
        longitude: number;
    };
    rating: number;
    description: string;
}

const ChatBox = () => {
    const [message, setMessage] = React.useState<Message[]>([]);
    const [userInput, setUserInput] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [isFinal, setIsFinal] = React.useState<boolean>(false);
    const [tripDetails, setTripDetails] = React.useState<TripInfo>();

    const SaveTripDetails = useMutation(api.tripDetails.CreateTripDetails)
    const {userDetail, setUserDetail} = useUserDetail();
    const tripDetailContext = useTripDetail();
    const setGlobalTripDetail = tripDetailContext?.setTripDetailInfo;

    const onSend = async (input?: string) => {
        const value = input !== undefined ? input : userInput;
        if (!value?.trim()) return;
        setLoading(true);

        setUserInput('');
        const newMsg: Message = {
            role: 'user',
            content: value
        };

        const updatedMessages = [...message, newMsg];
        setMessage(updatedMessages);
        
        // Function to make API request with retry logic
        const callGeminiAPI = async (retryCount = 0, maxRetries = 3) => {
            try {
                return await axios.post('/api/gemini', { 
                    messages: updatedMessages, 
                    isFinal: isFinal 
                });
            } catch (error: any) {
                console.error(`API call failed (attempt ${retryCount + 1}):`, error.message);
                
                // If we haven't reached max retries, try again after a delay
                if (retryCount < maxRetries) {
                    // Exponential backoff - wait longer between each retry
                    const delay = 1000 * Math.pow(2, retryCount);
                    console.log(`Retrying in ${delay/1000} seconds...`);
                    
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return callGeminiAPI(retryCount + 1, maxRetries);
                }
                
                // If all retries failed, throw the error
                throw error;
            }
        };
        
        let result: any = null;
        try {
            result = await callGeminiAPI();
            
            !isFinal && setMessage((prev: Message[]) => [...prev, {
                role: 'assistant',
                content: result?.data?.resp,
                ui: result?.data?.ui
            }]);
        } catch (error: any) {
            // Handle final error after all retries failed
            console.error("All API attempts failed:", error.message);
            // Add error message to the chat
            setMessage((prev: Message[]) => [...prev, {
                role: 'assistant',
                content: "I'm having trouble connecting right now. Please try again in a moment.",
                ui: ""
            }]);
            setLoading(false);
            return; // Exit the function early since we couldn't get a response
        }

        if(isFinal && result?.data?.trip_plan){
            try {
                setTripDetails(result.data.trip_plan);
                // Set to global context
                if (setGlobalTripDetail) {
                    setGlobalTripDetail(result.data.trip_plan);
                }
                
                // Check if userDetail exists and has a valid _id before calling SaveTripDetails
                if (userDetail && userDetail._id) {
                    try {
                        await SaveTripDetails({
                            tripId: uuidv4(),
                            tripDetails: result.data.trip_plan,
                            uid: userDetail._id
                        });
                        console.log("Trip details saved successfully");
                    } catch (error) {
                        console.error("Error saving trip details:", error);
                        // Still show a success message to the user as the trip was generated
                        // even though it might not have been saved to the database
                    }
                } else {
                    console.error("Cannot save trip details: User ID is not available");
                    // You might want to show an error message to the user here
                }
            } catch (error) {
                console.error("Error processing trip data:", error);
                setMessage((prev: Message[]) => [...prev, {
                    role: 'assistant',
                    content: "I generated your trip plan but encountered an error processing it. Please try again.",
                    ui: ""
                }]);
            }
        }
        setLoading(false);
        // console.log(result)
        // console.log(result?.data?.resp);
    }

    const RenderGenerativeUi = (ui: string) => {
        // console.log('Rendering UI for:', ui);
        if(ui === 'budget'){
            return <BudgetUi onSelectedOption={(v:string)=> {onSend(v)}} />
        }else if(ui === 'groupSize'){
            return <GroupSizeUi onSelectedOption={(v:string)=> {onSend(v)}} />
        }else if(ui === 'TripDuration'){
            return <SelectDays onSelectedOption={(v:string)=> {onSend(v)}} />
        }else if(ui === 'final'){
            return <Final  viewTrip={()=>{}} disable={!tripDetails}/>
        }else{
            return null;
        }
    }
        
    useEffect(() => {
        const lastMsg= message[message.length - 1];
        if(lastMsg?.ui === 'final'){
            setIsFinal(true);
            setUserInput('ok, Great');
        }
    }, [message]);

    useEffect(() => {
        if(isFinal && userInput){
            onSend()
            
        }
    }, [isFinal]);
        
    return (
        <div className='flex flex-col h-[85vh]'>
            {/* Display Message */}
            {message.length === 0 && <EmptyBoxState onSelectOption={(v:string)=>{onSend(v)}} />}
            <section className='flex-1 overflow-y-auto p-4'>
                {message.map((msg: Message, index: number) => (
                    msg.role === 'user' ? (
                        <div className='flex justify-end mt-2' key={index}>
                            <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                                {msg.content}
                            </div>
                        </div>
                    ) : (
                        <div key={index}  className='flex justify-start mt-2'>
                            <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg ">
                                {msg.content}
                                {RenderGenerativeUi(msg.ui ?? '')}
                            </div>
                        </div>
                    )
                ))}
                {loading && (
                        <div  className='flex justify-start mt-2'>
                            <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
                                <Loader className='animate-spin' />
                            </div>
                        </div>
                    )}
            </section>

            {/* User Input  */}
            <section>
                <div className='flex relative border rounded-2xl p-4'>
                    <Textarea placeholder='Start Typing Here...' onChange={(e) => {
                        setUserInput(e.target.value)
                    }} value={userInput} className='w-full h-24 bg-secondary/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none rounded-lg p-4 text-lg resize-none ' />
                    <Button size={'icon'} className='absolute bottom-6 right-6 cursor-pointer' onClick={() => onSend()} ><Send className='h-4 w-4' /></Button>
                </div>
            </section>

        </div>
    )
}

export default ChatBox