import { useQuery } from 'react-query';
import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';
import { OperationPayload } from '../../mutations/operations/useAddOperation';

interface SingleOperationResponse extends OperationPayload {}

const fetchSingleOperation = async (id: string): Promise<SingleOperationResponse> => {
  if (!id) {
    throw new Error('Operation ID is required');
  }

  return request('GET', `/operations/${id}`, undefined, false);
};

export const useFetchSingleOperation = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery(
    [QUERYKEYS.FETCHOPERATION, id],
    () => fetchSingleOperation(id),
    {
      enabled: !!id, 
      retry: 1,
    }
  );

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
