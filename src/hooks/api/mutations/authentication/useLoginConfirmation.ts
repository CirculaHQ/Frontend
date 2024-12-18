import CONFIG from '@/utils/config';
import axios from 'axios';
import { useMutation } from 'react-query';

interface VerifySignupPayload {
  email: string;
  otp: string;
}

interface VerifySignupResponse {
  refresh: string;
  access: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  message: string;
}

const useLoginConfirmation = () => {
  return useMutation<VerifySignupResponse, Error, VerifySignupPayload>(
    async (data: VerifySignupPayload) => {
      const response = await axios.post(`${CONFIG.API_BASE_URL}/auth/validate-otp`, data);
      return response.data;
    }
  );
};

export { useLoginConfirmation };
