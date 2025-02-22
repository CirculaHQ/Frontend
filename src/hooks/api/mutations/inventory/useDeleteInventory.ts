import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const DeleteInventory = async ({ id }: { id: string }): Promise<any> => {
  return await request<any>(
    'DELETE',
    `/inventory/${id}`,
    null,
    true,
    true,
    'Inventory deleted successfully!'
  );
};

type ErrorType = { error: string; success: boolean };

const useDeleteInventory = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, AxiosError<ErrorType>, { id: string }>(
    (id: { id: string }) => DeleteInventory(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERYKEYS.FETCHINVENTORY);
      },
    }
  );
};

export { useDeleteInventory };
