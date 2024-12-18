import CONFIG from "@/utils/config";
import { showToast } from "@/utils/toast";
import axios from "axios";
import { useMutation } from "react-query";


const useLogin = () => {
  
    return useMutation(
      async ({ email, password }: { email: string; password: string }) => {
        const response = await axios.post(`${CONFIG.API_BASE_URL}/auth/login`, {
          email,
          password,
        });
        return response.data;
      },
      {
        onSuccess: () => {
          showToast('Login successful!', 'success');
        },
        onError: (error: Error) => {
          console.error('Login error:', error);
          showToast('Login failed. Please try again.', 'error');
        },
      }
    );
  };
  
  export default useLogin;