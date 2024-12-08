// import { appRoute } from "@/config/routeMgt/routePaths";
import CONFIG from "@/utils/config";
import { showToast } from "@/utils/toast";
import axios from "axios";
import { useMutation } from "react-query";
// import { useNavigate } from "react-router-dom";


const useLogin = () => {
    // const navigate = useNavigate();
  
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
        //   navigate(appRoute.login_confirmation, { state: { email: variables.email } });
        },
        onError: (error: Error) => {
          console.error('Login error:', error);
          showToast('Login failed. Please try again.', 'error');
        },
      }
    );
  };
  
  export default useLogin;