import { AddMemberPayload, Member } from '@/types/team';
import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';
import { showToast } from '@/utils/toast';
import { useMutation, useQueryClient } from 'react-query';

export const useAddTeamMember = (callback?: () => void) => {
    const queryClient = useQueryClient();

    const addTeamMember = async (data: AddMemberPayload): Promise<Member> => {
        const response = await request<Member>('POST', `/team/add_member`, data, false, false);
        return response;
    };

    return useMutation({
        mutationFn: addTeamMember,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_TEAM_MEMBERS] });
            showToast('Member added successfully!', 'success');
            callback?.();
        },
        onError: (err: any) => {
            showToast('Failed to add member. Please try again.', 'error');
        },
    });
};

export const useDeleteTeamMember = () => {
    const queryClient = useQueryClient();

    const deleteTeamMember = async (memberId: string): Promise<any> => {
        return await request<any>(
            'DELETE',
            `/team/${memberId}/delete`,
            null,
            false,
            false
        );
    };

    return useMutation({
        mutationFn: deleteTeamMember,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_TEAM_MEMBERS] });
            showToast('Member deleted successfully!', 'success');
        },
        onError: () => {
            showToast('Failed to delete member. Please try again.', 'error');
        },
    });
};
