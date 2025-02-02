import { useQuery } from 'react-query';
import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';
import { OperationPayload } from '../../mutations/operations/useAddOperation';

interface OperationQueryParams {
    inventory_id?: string | null;
    inventory_material?: string;
    inventory_material_type?: string;
    limit?: number;
    offset?: number;
    operation_type?: string;
    ordering?: string;
    search?: string;
}

interface InventoryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: OperationPayload[];
}


const fetchOperations = async (params: OperationQueryParams = {}): Promise<InventoryResponse> => {
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
    .join('&');

  return request('GET', `/operations?${queryString}`, undefined, false);
};

export const useFetchOperations = (initialParams: OperationQueryParams = {}) => {
  const { data, isLoading, error, refetch } = useQuery(
    [QUERYKEYS.FETCHOPERATIONS, initialParams],
    () => fetchOperations(initialParams),
    {
      retry: 1,
      keepPreviousData: true,
    }
  );

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
