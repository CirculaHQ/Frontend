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
      showToast('Invoice created successfully!', 'success');
    },
    onError: (err: any) => {
      showToast('Failed to create invoice. Please try again.', 'error');
    },
  });
};

export const useEditInvoice = (invoiceId: string) => {
  const queryClient = useQueryClient();

  const editInvoice = async (data: CreateInvoicePayload): Promise<CreateInvoicePayload> => {
    const response = await request<CreateInvoicePayload>('PUT', `/invoices/${invoiceId}`, data, false, false);
    return response;
  };

  return useMutation({
    mutationFn: editInvoice,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_INVOICES] });
      await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.FETCH_INVOICE, invoiceId] });
      showToast('Invoice edited successfully!', 'success');
    },
    onError: (err: any) => {
      showToast('Failed to edit invoice. Please try again.', 'error');
    },
  });
};