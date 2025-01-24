import { appRoute } from '@/config/routeMgt/routePaths';
import { AccountType } from '@/types';
import request from '@/utils/api';
import { showToast } from '@/utils/toast';
import { useMutation } from 'react-query';

interface AddCustomerResponse {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  nickname: string;
  date_of_birth: string;
  business_name: string;
  phone_number: string;
  email: string;
  country: string;
  address: string;
  lga: string;
  state: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  notes: string;
  photo: string;
  type: AccountType;
  archived: boolean;
  user: string; // UUID of the user
}

interface AddCustomerPayload {
  first_name: string;
  last_name: string;
  nickname: string;
  date_of_birth?: string;
  business_name: string;
  phone_number: string;
  email: string;
  country: string;
  address: string;
  lga: string;
  state: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  notes: string;
  photo?: string;
  type: AccountType;
  user: string;
  role?: string;
}

const addCustomer = async (data: AddCustomerPayload): Promise<AddCustomerResponse> => {
  const response = await request<AddCustomerResponse>(
    'POST',
    `/customer`,
    data,
    true,
    true
  );
  return response;
};

const useAddCustomer = (callback?: (e: any) => void) => {
  return useMutation({
    mutationFn: addCustomer,
    onSuccess: async (response: any) => {
      showToast('Customer created successfully!', 'success');
      callback?.(`${appRoute.customers}/${response.user}`);
    },
    onError: (err: any) => {
      showToast('Failed to create customer. Please try again.', 'error');
    },
  });
};

export { useAddCustomer };
