import { User } from "@/types/user";
import { QUERYKEYS } from "@/utils/query-keys";
import { useQueryClient } from "react-query";

export const useCachedUserProfile = () => {
    const queryClient = useQueryClient();
    const userDetails = queryClient.getQueryData([QUERYKEYS.FETCH_USER_PROFILE]) as User

    return {
        userDetails,
        userId: userDetails?.id || ''
     };
};