import { User } from "@/types/user";
import request from "@/utils/api";
import { QUERYKEYS } from "@/utils/query-keys";
import { useQuery } from "react-query";

export const useFetchUserProfile = () => {
    const fetchUserProfile = async (): Promise<User> => {
        return await request<User>('GET', `/users/profile`, null, false, true);
    };

    return useQuery<User>({
        queryKey: [QUERYKEYS.FETCH_USER_PROFILE],
        refetchOnWindowFocus: false,
        queryFn: () => fetchUserProfile(),
        select: (res) => res,
        retry: false,
    });
};