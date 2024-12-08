// import { appRoute } from "@/config/routeMgt/routePaths";
import CONFIG from "@/utils/config";
import { showToast } from "@/utils/toast";
import axios from "axios";
// import request from "@/utils/api";
import { useMutation } from "react-query";
// import { useNavigate } from "react-router-dom";


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
      console.log('API Response:', response.data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        showToast('Account created successfully! Please verify your email.', 'success');
        console.log('Mutation success data:', data);
      },
      onError: (error: Error) => {
        console.error('Signup error:', error);
        showToast('Failed to create account. Please try again.', 'error');
      },
    }
  );
};

export default useSignup;