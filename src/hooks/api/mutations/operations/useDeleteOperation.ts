import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

type ErrorType = { error: string; success: boolean };
type DeleteOperationResponse = { success: boolean; message: string };

const DeleteOperation = async (id: string): Promise<AxiosResponse<DeleteOperationResponse>> => {
  return await request<AxiosResponse<DeleteOperationResponse>>(
    'DELETE',
    `/operations/${id}`,
    undefined,
    true,
    true,
    'Operation deleted successfully!'
  );
};

const useDeleteOperation = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<DeleteOperationResponse>, AxiosError<ErrorType>, string>(
    (id: string) => DeleteOperation(id),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QUERYKEYS.FETCHOPERATIONS);
      },
    }
  );
};

export { useDeleteOperation };
