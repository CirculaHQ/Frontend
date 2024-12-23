import { useState, useEffect } from 'react';
import request from '@/utils/api';

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

export const useFetchInventory = (initialParams: InventoryQueryParams = {}) => {
  const [data, setData] = useState<InventoryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState<InventoryQueryParams>(initialParams);

  const fetchInventory = async (params: InventoryQueryParams = {}) => {
    setLoading(true);
    setError(null);

    const queryString = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
        .join('&');

    try {
      const response = await request<InventoryResponse>(
        'GET',
        `/inventory?${queryString}`,
        undefined,
        false
      );
      setData(response);
    } catch (err: any) {
      setError(err?.message || 'An error occurred while fetching inventory data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory(queryParams);
  }, [queryParams]);

  return {
    data,
    loading,
    error,
    setQueryParams,
    refetch: () => fetchInventory(queryParams),
  };
};
