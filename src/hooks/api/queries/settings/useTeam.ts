import { Member, MembersResponse, Role } from "@/types/team";
import request from "@/utils/api";
import { generateQueryParams } from "@/utils/objectFormatter";
import { QUERYKEYS } from "@/utils/query-keys";
import { useQuery } from "react-query";

export const useFetchTeamMembers = (params: any) => {
    const fetchTeamMembers = async (): Promise<MembersResponse> => {
        return await request<MembersResponse>('GET', `/team${generateQueryParams(params)}`, null, false, true);
    };

    return useQuery<MembersResponse>({
        queryKey: [QUERYKEYS.FETCH_TEAM_MEMBERS, JSON.stringify(params)],
        refetchOnWindowFocus: false,
        queryFn: () => fetchTeamMembers(),
        select: (res) => res,
        retry: false,
        keepPreviousData: true,
    });
};

export const useFetchTeamMember = (id: string) => {
    const fetchTeamMember = async (): Promise<Member> => {
        return await request<Member>('GET', `/team/${id}`, null, false, true);
    };

    return useQuery<Member>({
        queryKey: [QUERYKEYS.FETCH_TEAM_MEMBER],
        refetchOnWindowFocus: false,
        enabled: !!id,
        queryFn: () => fetchTeamMember(),
        select: (res) => res,
        retry: false,
        keepPreviousData: true,
    });
};

export const useFetchTeamRoles = () => {
    const fetchTeamRoles = async (): Promise<Role[]> => {
        return await request<Role[]>('GET', `/team/roles`, null, false, true);
    };

    return useQuery<Role[]>({
        refetchOnWindowFocus: false,
        queryFn: () => fetchTeamRoles(),
        select: (res) => res,
        retry: false,
        keepPreviousData: true,
    });
};