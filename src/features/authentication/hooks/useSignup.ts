import { appRoute } from "@/config/routeMgt/routePaths";
import request from "@/utils/api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();

  return useMutation<SignupResponse, Error, SignupPayload>(
    async (data: SignupPayload) => {
      return await request('POST', '/auth/register', data, false, true);
    },
    {
      onSuccess: (data) => {
        if (data?.email) {
          navigate(appRoute.sign_up_confirmation, { state: { email: data.email } });
        }
      },
      onError: (error) => {
        console.error('Signup error:', error);
      },
    }
  );
};

export default useSignup;

