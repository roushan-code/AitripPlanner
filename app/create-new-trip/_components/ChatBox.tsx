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
import { useUserDetail, useTripDetail } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid';
import { createTripDetails } from '@/app/api/mongo-adapter';

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
    hotels: any[];
    itinerary: any[];
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
    const [saving, setSaving] = React.useState<boolean>(false);
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
                // Process and sanitize trip data before using it
                const tripData = result.data.trip_plan;
                
                // Basic validation to ensure we have the essential fields
                if (!tripData.destination || !tripData.duration || !tripData.origin) {
                    throw new Error("Generated trip data is missing essential information");
                }
                
                // Set trip details locally
                setTripDetails(tripData);
                
                // Set to global context if available
                if (setGlobalTripDetail) {
                    setGlobalTripDetail(tripData);
                }
                
                // Only attempt to save if user is authenticated
                if (userDetail && userDetail._id) {
                    try {
                        const tripId = uuidv4();
                        
                        // Log size of data being saved for debugging
                        const dataSize = JSON.stringify(tripData).length;
                        console.log(`Saving trip data (${dataSize} bytes) with ID: ${tripId}`);
                        
                        // MongoDB has a document size limit of 16MB, but we should still
                        // be cautious with very large documents
                        if (dataSize > 10000000) { // 10MB warning threshold
                            console.warn("Trip data exceeds 10MB, this may cause issues with database storage");
                        }
                        
                        setSaving(true);
                        
                        // Save trip using the MongoDB adapter
                        await createTripDetails({
                            tripId: tripId,
                            tripDetails: tripData as TripInfo
                        });
                        
                        setSaving(false);
                        
                        console.log("Trip details saved successfully");
                        
                        // Add success message to the chat
                        setMessage((prev: Message[]) => [...prev, {
                            role: 'assistant',
                            content: "Your trip has been generated and saved successfully!",
                            ui: "final"
                        }]);
                        
                    } catch (savingError: any) {
                        setSaving(false);
                        console.error("Error saving trip details:", savingError);
                        
                        // Show error message but don't disrupt the user experience
                        setMessage((prev: Message[]) => [...prev, {
                            role: 'assistant',
                            content: "Your trip was created, but I couldn't save it to your profile. You can still view the current details.",
                            ui: "final"
                        }]);
                    }
                } else {
                    console.log("User not authenticated, trip details available but not saved");
                    
                    // Notify the user they can see the trip but it's not saved
                    setMessage((prev: Message[]) => [...prev, {
                        role: 'assistant',
                        content: "Your trip has been generated! Sign in to save it to your profile.",
                        ui: "final"
                    }]);
                }
            } catch (processingError) {
                console.error("Error processing trip data:", processingError);
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
        <div className='flex flex-col h-[100%]'>
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