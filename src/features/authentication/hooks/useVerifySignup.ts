// import request from '@/utils/api';
import CONFIG from '@/utils/config';
import { showToast } from '@/utils/toast';
import axios from 'axios';
import { useMutation } from 'react-query';
// import { useNavigate } from 'react-router-dom';

interface VerifySignupPayload {
  email: string;
  otp: string;
}

interface VerifySignupResponse {
  access: string;
  message: string;
}

const useVerifySignup = () => {
  return useMutation<VerifySignupResponse, Error, VerifySignupPayload>(
    async (data: VerifySignupPayload) => {
      const response = await axios.post(`${CONFIG.API_BASE_URL}/auth/validate-otp`, data);
      console.log('API Response:', response.data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        showToast('Account verified successfully!', 'success');
        console.log('Mutation success data:', data);
      },
      onError: (error: Error) => {
        console.error('Verification error:', error);
        showToast('Verification failed. Please try again.', 'error');
      },
    }
  );
};

export default useVerifySignup;