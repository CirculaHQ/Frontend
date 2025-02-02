import CONFIG from '@/utils/config';
import { showToast } from '@/utils/toast';
import axios from 'axios';
import { useMutation } from 'react-query';

interface SignupResponse {
  email: string;
}

interface SignupPayload {
  first_name: string;
  last_name: string;
  email: string;
  organization: string;
  commodities: string[];
  password: string;
}

const useSignup = () => {
  return useMutation<SignupResponse, Error, SignupPayload>(
    async (data: SignupPayload) => {
      const response = await axios.post(`${CONFIG.API_BASE_URL}/auth/register`, data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        showToast('Account created successfully! Please verify your email.', 'success');
      },
      onError: (error: Error) => {
        showToast('Failed to create account. Please try again.', 'error');
      },
    }
  );
};

export { useSignup };
