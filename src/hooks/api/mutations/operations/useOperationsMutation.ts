import { CreateBatchPayload, CreateBatchResponse, AddSubOperationPayload } from '@/types/operations';
import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';
import { showToast } from '@/utils/toast';
import { useMutation, useQueryClient } from 'react-query';

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

export const useAddSubOperation = () => {
    const queryClient = useQueryClient();

    const addSubOperation = async (data: AddSubOperationPayload): Promise<CreateBatchResponse> => {
        const response = await request<CreateBatchResponse>('POST', `/operations/create-sub-operation`, data, false, false);
        return response;
    };

    return useMutation({
        mutationFn: addSubOperation,
        onSuccess: async (res) => {
            showToast('Sub operation added successfully!', 'success');
            await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_OPERATION_BY_ID, res.id] });
            await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_OPERATIONS_BY_BATCH, res.batch] }); 
        },
        onError: () => {
            showToast('Failed to add sub operation. Please try again.', 'error');
        },
    });
};

export const useUpdateSubOperation = (operationId: string, batchId: string) => {
    const queryClient = useQueryClient();

    const updateSubOperation = async (data: AddSubOperationPayload): Promise<CreateBatchResponse> => {
        const response = await request<CreateBatchResponse>('PUT', `/operations/${operationId}`, data, false, false);
        return response;
    };

    return useMutation({
        mutationFn: updateSubOperation,
        onSuccess: async () => {
            showToast('Sub operation updated successfully!', 'success');
            await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_OPERATION_BY_ID, operationId] });
            await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_OPERATIONS_BY_BATCH, batchId] }); 
        },
        onError: () => {
            showToast('Failed to update sub operation. Please try again.', 'error');
        },
    });
};