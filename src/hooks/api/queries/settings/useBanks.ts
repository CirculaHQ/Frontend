import { BanksResponse } from "@/types/settings";
import request from "@/utils/api";
import { generateQueryParams } from "@/utils/objectFormatter";
import { QUERYKEYS } from "@/utils/query-keys";
import { useQuery } from "react-query";

interface Params {
    limit?: number;
    offset?: number;
}

export const useFetchBanks = ({ limit = 20, offset = 0 }: Params) => {
    const params = { limit, offset }
    const fetchBanks = async () => {
        return await request<BanksResponse>(
            'GET',
            `/bank${generateQueryParams(params)}`,
            null,
            false,
            false
        );
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [QUERYKEYS.FETCH_BANKS, JSON.stringify(params)],
        refetchOnWindowFocus: false,
        queryFn: () => fetchBanks(),
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