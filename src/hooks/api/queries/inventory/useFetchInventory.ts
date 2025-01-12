import { useQuery } from 'react-query';
import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';

interface InventoryQueryParams {
  currency?: string;
  customer?: string;
  limit?: number;
  material?: string;
  material_state?: string;
  material_type?: string;
  offset?: number;
  ordering?: string;
  search?: string;
  type?: string;
  vendor?: string;
}

interface InventoryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Inventory[];
}

interface Inventory {
  id: string;
  created_at: string;
  updated_at: string;
  type: string;
  date_received: string;
  material: string;
  material_type: string;
  material_state: string;
  currency: string;
  amount: string;
  quantity: number;
  code: string;
  vendor: string;
  customer: string;
  user: string;
}

const fetchInventory = async (params: InventoryQueryParams = {}): Promise<InventoryResponse> => {
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
    .join('&');

  return request('GET', `/inventory?${queryString}`, undefined, false);
};

export const useFetchInventory = (initialParams: InventoryQueryParams = {}) => {
  const { data, isLoading, error, refetch } = useQuery(
    [QUERYKEYS.FETCHINVENTORY, initialParams],
    () => fetchInventory(initialParams),
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
