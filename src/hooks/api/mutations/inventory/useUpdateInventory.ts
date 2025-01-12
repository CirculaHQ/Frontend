import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

interface UpdateInventoryPayload {
  id: string;
  type?: string;
  date_received?: string;
  vendor?: string;
  customer?: string;
  material?: string;
  material_type?: string;
  material_state?: string;
  currency?: string;
  amount?: string | number;
  quantity?: number;
  user?: string;
}

type ErrorType = { error: string; success: boolean };

const UpdateInventory = async (payload: UpdateInventoryPayload): Promise<any> => {
  const { id, ...updateData } = payload;

  return await request<any>(
    'PUT',
    `/inventory/${id}`,
    updateData,
    true,
    true,
    'Inventory updated successfully!'
  );
};

const useUpdateInventory = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<ResponseType>, AxiosError<ErrorType>, UpdateInventoryPayload>(
    (input: UpdateInventoryPayload) => UpdateInventory(input),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QUERYKEYS.FETCHINVENTORY);
      },
    }
  );
};

export { useUpdateInventory };
