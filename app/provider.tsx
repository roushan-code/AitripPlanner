import { api } from '@/convex/_generated/api';
import { UserDetailContext } from '@/UserDetailContext';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react'
import Header from './_components/Header';

const provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const CreateUser = useMutation(api.user.CreateNewUser);

  const [userDetail, setUserDetail] = useState<any>(null);

  const { user } = useUser();

  useEffect(() => {
    user && CreateNewUser();
  }, [user])


  const CreateNewUser = async () => {
    // Create a new user in the database
    if (user) {
      const result = await CreateUser({
        name: user?.fullName || "No Name",
        imageUrl: user?.imageUrl || "",
        email: user?.emailAddresses[0]?.emailAddress || "",
      });
      setUserDetail(result);
    }
    

  }
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>
        <Header />
        {children}
      </div>
    </UserDetailContext.Provider>
  )
}

export default provider

export const useUserDetail = () => React.useContext(UserDetailContext);