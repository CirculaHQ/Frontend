import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export interface OperationPayload {
    id: string | null;
    operation_type: string;
    start_date: string | undefined;
    start_time: string | undefined;
    end_date: string | undefined;
    end_time: string | undefined;
    input_quantity: number;
    quantity_produced: number;
    waste_produced: number;
    user: string;
    inventory: string;
}

type ErrorType = { error: string; success: boolean };
const AddOperation = async (payload: OperationPayload): Promise<any> => {
  return await request<any>(
    'POST',
    '/operations',
    payload,
    true,
    true,
    'Operation added successfully!'
  );
};

const useAddOperation = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<ResponseType>, AxiosError<ErrorType>, OperationPayload>(
    (input: OperationPayload) => AddOperation(input),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QUERYKEYS.FETCHOPERATIONS);
      },
    }
  );
};

export { useAddOperation };