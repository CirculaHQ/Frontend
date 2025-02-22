import { AddCustomerPayload, AddCustomerResponse } from '@/types/customers';
import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';
import { showToast } from '@/utils/toast';
import { useMutation, useQueryClient } from 'react-query';

const useAddVendor = () => {
    const queryClient = useQueryClient();

    const addVendor = async (data: AddCustomerPayload): Promise<AddCustomerResponse> => {
        const response = await request<AddCustomerResponse>('POST', `/vendor`, data, false, false);
        return response;
    };

    return useMutation({
        mutationFn: addVendor,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_VENDORS] });
            showToast('Vendor created successfully!', 'success');
        },
        onError: () => {
            showToast('Failed to create vendor. Please try again.', 'error');
        },
    });
};

const useEditVendor = () => {
    const queryClient = useQueryClient();
    let id: string;

    const editVendor = async ({ vendorId, payload }: {
        vendorId: string;
        payload: AddCustomerPayload;
    }): Promise<AddCustomerResponse> => {
        id = vendorId;
        return await request<AddCustomerResponse>(
            'PATCH',
            `/vendor/${vendorId}`,
            payload,
            false,
            false
        );
    };

    return useMutation({
        mutationFn: editVendor,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_VENDORS] });
            await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_VENDOR, id] });
            showToast('Vendor updated successfully!', 'success');
        },
        onError: (err: any) => {
            showToast('Failed to edit vendor. Please try again.', 'error');
        },
    });
};

export { useAddVendor, useEditVendor };
