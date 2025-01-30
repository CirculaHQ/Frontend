import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

interface AddInventoryPayload {
  type: string;
  date_received: string;
  vendor: string;
  customer?: string;
  material: string;
  material_type: string;
  material_state: string;
  currency: string;
  amount: string | number;
  quantity: number;
  user: string;
}

type ErrorType = { error: string; success: boolean };
const AddInventory = async (payload: AddInventoryPayload): Promise<any> => {
  return await request(
    'POST',
    '/inventory',
    payload,
    true,
    true,
    'Inventory added successfully!'
  );
};

const useAddInventory = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<ResponseType>, AxiosError<ErrorType>, AddInventoryPayload>(
    (input: AddInventoryPayload) => AddInventory(input),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QUERYKEYS.FETCHINVENTORY);
      },
    }
  );
};

export { useAddInventory };
