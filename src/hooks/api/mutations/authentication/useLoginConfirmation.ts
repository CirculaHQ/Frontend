import request from '@/utils/api';
import { AxiosError, AxiosResponse } from 'axios';
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

type ErrorType = { error: string; };

const verifySignup = (data: VerifySignupPayload): Promise<AxiosResponse<VerifySignupResponse>> => {
  return request(
    'POST',
    `/auth/validate-otp`,
    {
      email: data.email,
      otp: data.otp,
    },
    false // don't need authorization for this endpoint
  );
};

const useLoginConfirmation = () => {
  return useMutation<AxiosResponse<VerifySignupResponse>, AxiosError<ErrorType>, VerifySignupPayload>(
    (data: VerifySignupPayload) => verifySignup(data)
  );
};

export { useLoginConfirmation };