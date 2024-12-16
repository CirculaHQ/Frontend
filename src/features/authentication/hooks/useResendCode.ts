import CONFIG from "@/utils/config";
import { showToast } from "@/utils/toast";
import axios from "axios";
import { useMutation } from "react-query";


const useResendCode = () => {
    return useMutation(
      async (email: string) => {
        const response = await axios.post(`${CONFIG.API_BASE_URL}/otp/send`, { email });
        return response.data;
      },
      {
        onSuccess: () => {
          showToast('Code resent successfully. Please check your email.', 'success');
        },
        onError: (error: Error) => {
          console.error('Resend code error:', error);
          showToast('Failed to resend code. Please try again.', 'error');
        },
      }
    );
  };
  
  export default useResendCode;