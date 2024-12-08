import { appRoute } from "@/config/routeMgt/routePaths";
import CONFIG from "@/utils/config";
import { showToast } from "@/utils/toast";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";


const useLoginConfirmation = () => {
    const navigate = useNavigate();
  
    return useMutation(
      async ({ email, otp }: { email: string; otp: string }) => {
        const response = await axios.post(`${CONFIG.API_BASE_URL}/otp/validate`, {
          email,
          otp,
        });
        return response.data;
      },
      {
        onSuccess: () => {
          showToast('Verification successful!', 'success');
          navigate(appRoute.home);
        },
        onError: (error: Error) => {
          console.error('Verification error:', error);
          showToast('Invalid verification code. Please try again.', 'error');
        },
      }
    );
  };
  
  export default useLoginConfirmation;