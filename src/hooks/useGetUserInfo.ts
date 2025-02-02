// import { useGlobalContext } from "@/stateManagement/GlobalContext";
import { useAuthUser } from "react-auth-kit";

export const useGetUserInfo = () => {
//   const { userId } = useGlobalContext();
  const auth = useAuthUser();
  const userDetails = auth();
  const userID = userDetails?.id;
//   const token = userDetails?.id;

  return { userID, userDetails };
};
