import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export interface UpdateOperationPayload {
    id: string; 
    operation_type?: string;
    start_date?: string;
    start_time?: string;
    end_date?: string;
    end_time?: string;
    input_quantity?: number;
    quantity_produced?: number;
    waste_produced?: number;
    user?: string;
    inventory?: string;
}

type ErrorType = { error: string; success: boolean };
const UpdateOperation = async (payload: UpdateOperationPayload): Promise<any> => {
  const { id, ...data } = payload;
  return await request<any>(
    'PATCH',
    `/operations/${id}`,
    data,
    true,
    true,
    'Operation updated successfully!'
  );
};

const useUpdateOperation = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<ResponseType>, AxiosError<ErrorType>, UpdateOperationPayload>(
    (input: UpdateOperationPayload) => UpdateOperation(input),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QUERYKEYS.FETCHINVENTORY);
      },
    }
  );
};

export { useUpdateOperation };
