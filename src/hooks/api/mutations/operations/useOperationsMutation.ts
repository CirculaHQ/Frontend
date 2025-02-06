import { CreateBatchPayload, CreateBatchResponse } from '@/types/operations';
import request from '@/utils/api';
import { showToast } from '@/utils/toast';
import { useMutation } from 'react-query';

export const useCreateBatch = () => {
    const createBatch = async (data: CreateBatchPayload): Promise<CreateBatchResponse> => {
        const response = await request<CreateBatchResponse>('POST', `/operations/create-batch`, data, false, false);
        return response;
    };

    return useMutation({
        mutationFn: createBatch,
        onSuccess: async () => {
            showToast('Batch created successfully!', 'success');
        },
        onError: () => {
            showToast('Failed to create batch. Please try again.', 'error');
        },
    });
};