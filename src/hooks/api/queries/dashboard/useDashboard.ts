import { ChartResponse, RecentActivitiesResponse } from '@/types/dashboard';
import request from '@/utils/api';
import { generateQueryParams } from '@/utils/objectFormatter';
import { QUERYKEYS } from '@/utils/query-keys';
import { useQuery } from 'react-query';

export const useFetchRecentActivities = (params: { offset: number, limit: number }) => {
    const fetchRecentActivities = async (): Promise<RecentActivitiesResponse> => {
        return await request<RecentActivitiesResponse>(
            'GET',
            `/dashboard/activities/recent${generateQueryParams(params)}`,
            null,
            false,
            true
        );
    };

    return useQuery({
        queryKey: [QUERYKEYS.FETCH_RECENT_ACTIVITIES, JSON.stringify(params)],
        refetchOnWindowFocus: false,
        queryFn: () => fetchRecentActivities(),
        select: (res) => res,
        retry: false,
        keepPreviousData: true,
    });
};

export const useFetchDashboardOperations = (params: { type: string, duration: string }) => {
    const fetchDashboardOperations = async (): Promise<ChartResponse> => {
        return await request<ChartResponse>(
            'GET',
            `/dashboard/operations${generateQueryParams(params)}`,
            null,
            false,
            true
        );
    };

    return useQuery({
        queryKey: [QUERYKEYS.FETCH_DASHBOARD_OPERATIONS, JSON.stringify(params)],
        refetchOnWindowFocus: false,
        queryFn: () => fetchDashboardOperations(),
        select: (res) => res,
        retry: false,
        keepPreviousData: true,
    });
};

export const useFetchDashboardInventory = (params: { type: string, duration: string }) => {
    const fetchDashboardInventory = async (): Promise<ChartResponse> => {
        return await request<ChartResponse>(
            'GET',
            `/dashboard/inventory${generateQueryParams(params)}`,
            null,
            false,
            true
        );
    };

    return useQuery({
        queryKey: [QUERYKEYS.FETCH_DASHBOARD_INVENTORY, JSON.stringify(params)],
        refetchOnWindowFocus: false,
        queryFn: () => fetchDashboardInventory(),
        select: (res) => res,
        retry: false,
        keepPreviousData: true,
    });
};