import request from '@/utils/api';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

interface VerifySignupPayload {
  email: string;
  otp: string;
}

const useVerifySignup = () => {
  const navigate = useNavigate();

  return useMutation(
    async (data: VerifySignupPayload) => {
      return await request('POST', '/signup/verify', data, false, true);
    },
    {
      onSuccess: () => {
        navigate('/dashboard');
      },
      onError: (error) => {
        console.error('Verification error:', error);
      },
    }
  );
};

export default useVerifySignup;