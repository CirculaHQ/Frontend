import request from "@/utils/api";
import { QUERYKEYS } from "@/utils/query-keys";
import { useQuery } from "react-query";

export const useFetchOperationTypes = () => {
    const fetchCustomer = async (): Promise<Customer> => {
        return await request<Customer>('GET', `/operations/get_operation_types`, null, false, true);
    };

    return useQuery<Customer>({
        queryKey: [QUERYKEYS.FETCH_OPERATION_TYPES],
        refetchOnWindowFocus: false,
        queryFn: () => fetchCustomer(),
        select: (res) => res,
        retry: false,
    });
};