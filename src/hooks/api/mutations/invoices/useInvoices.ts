import { CreateInvoicePayload } from "@/types/invoice";
import request from "@/utils/api";
import { QUERYKEYS } from "@/utils/query-keys";
import { showToast } from "@/utils/toast";
import { useMutation, useQueryClient } from "react-query";

export const useCreateInvoice = () => {
    const queryClient = useQueryClient();
  
    const createInvoice = async (data: CreateInvoicePayload): Promise<CreateInvoicePayload> => {
      const response = await request<CreateInvoicePayload>('POST', `/invoices`, data, false, false);
      return response;
    };
  
    return useMutation({
      mutationFn: createInvoice,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_INVOICES] });
        showToast('Customer created successfully!', 'success');
      },
      onError: (err: any) => {
        showToast('Failed to create customer. Please try again.', 'error');
      },
    });
  };