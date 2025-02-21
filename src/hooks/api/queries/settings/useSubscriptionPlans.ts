import { SubscriptionPlanResponse } from "@/types/plans";
import request from "@/utils/api";
import { generateQueryParams } from "@/utils/objectFormatter";
import { QUERYKEYS } from "@/utils/query-keys";
import { useQuery } from "react-query";

interface Params {
    limit?: number;
    offset?: number;
}

export const useFetchSubscriptionPlans = ({ limit = 20, offset = 0 }: Params) => {
    const params = { limit, offset }
    const fetchSubscriptionPlans = async (): Promise<SubscriptionPlanResponse> => {
        return await request<SubscriptionPlanResponse>(
            'GET',
            `/products${generateQueryParams(params)}`,
            null,
            false,
            true
        );
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [QUERYKEYS.FETCH_SUBSCRIPTION_PLANS, JSON.stringify(params)],
        refetchOnWindowFocus: false,
        queryFn: () => fetchSubscriptionPlans(),
        select: (res) => res,
        retry: false,
        keepPreviousData: true,
    });

    return {
        data,
        isLoading,
        isError,
        error,
    };
}