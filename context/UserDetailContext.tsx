import { createContext } from "react";
import { UserInfo } from "@/app/api/mongo-adapter";

type UserDetailContextType = {
  userDetail: UserInfo | null | undefined;
  setUserDetail: (userDetail: UserInfo | null) => void;
  loading: boolean;
};

export const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: null,
  setUserDetail: () => {},
  loading: true
});