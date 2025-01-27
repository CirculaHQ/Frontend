import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

import request from '@/utils/api';

type ResponseType = {
  success: boolean;
  data: string;
};

type InputType = {
  email: string;
};

type ErrorType = { error: string; success: boolean };

const SendOtp = (input: InputType): Promise<AxiosResponse<ResponseType>> => {
  return request(
    'POST',
    `/otp/send`,
    {
      email: input.email,
    },
    false
  );
};

const useSendOtp = () => {
  return useMutation<AxiosResponse<ResponseType>, AxiosError<ErrorType>, InputType>(
    (input: InputType) => SendOtp(input)
  );
};

export { useSendOtp };
