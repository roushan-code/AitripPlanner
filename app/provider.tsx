import { UserDetailContext } from '@/context/UserDetailContext';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import Header from './_components/Header';
import { TripDetailContext } from '@/context/TripDetailContext';
import { getUserDetails, TripInfo } from './api/mongo-adapter';

const provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [userDetail, setUserDetail] = useState<any>();
  const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [user])

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      // This will create the user if they don't exist, or fetch if they do
      const userData = await getUserDetails();
      
      if (userData) {
        setUserDetail(userData);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail, loading }}>  
      <TripDetailContext.Provider value={{tripDetailInfo, setTripDetailInfo}}>
      <div>
        <Header />
        {children}
      </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  )
}

export default provider

export const useUserDetail = () => React.useContext(UserDetailContext);

export const useTripDetail = () => {
  return React.useContext(TripDetailContext);
};