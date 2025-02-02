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

const ForgotPassword = (input: InputType): Promise<AxiosResponse<ResponseType>> => {
  return request(
    'POST',
    `/auth/login`,
    {
      email: input.email,
    },
    false
  );
};

const useForgotPassword = () => {
  return useMutation<AxiosResponse<ResponseType>, AxiosError<ErrorType>, InputType>(
    (input: InputType) => ForgotPassword(input)
  );
};

export { useForgotPassword };
