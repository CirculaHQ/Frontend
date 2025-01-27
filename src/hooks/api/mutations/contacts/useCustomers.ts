import { appRoute } from '@/config/routeMgt/routePaths';
import { AddCustomerPayload, AddCustomerResponse } from '@/types/customers';
import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';
import { showToast } from '@/utils/toast';
import { useMutation, useQueryClient } from 'react-query';

const useAddCustomer = (callback?: (e: any) => void) => {
  const queryClient = useQueryClient();

  const addCustomer = async (data: AddCustomerPayload): Promise<AddCustomerResponse> => {
    const response = await request<AddCustomerResponse>('POST', `/customer`, data, true, true);
    return response;
  };

  return useMutation({
    mutationFn: addCustomer,
    onSuccess: async (response: any) => {
      await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_CUSTOMERS] });
      showToast('Customer created successfully!', 'success');
      callback?.(`${appRoute.customers}/${response.id}`);
    },
    onError: (err: any) => {
      showToast('Failed to create customer. Please try again.', 'error');
    },
  });
};

const useEditCustomer = (callback?: (e: any) => void) => {
  const queryClient = useQueryClient();
  let id: string;

  const editCustomer = async ({
    customerId,
    payload,
  }: {
    customerId: string;
    payload: AddCustomerPayload;
  }): Promise<AddCustomerResponse> => {
    id = customerId;
    return await request<AddCustomerResponse>(
      'PATCH',
      `/customer/${customerId}`,
      payload,
      true,
      true
    );
  };

  return useMutation({
    mutationFn: editCustomer,
    onSuccess: async (response: any) => {
      await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_CUSTOMERS] });
      await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_CUSTOMER, id] });
      showToast('Customer updated successfully!', 'success');
      callback?.(`${appRoute.customers}/${id}`);
    },
    onError: (err: any) => {
      showToast('Failed to edit customer. Please try again.', 'error');
    },
  });
};

export { useAddCustomer, useEditCustomer };
