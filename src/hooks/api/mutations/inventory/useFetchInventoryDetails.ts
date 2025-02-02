import { useState, useEffect } from 'react';
import request from '@/utils/api';

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

export const useFetchInventoryDetails = (inventoryId: string) => {
  const [data, setData] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInventoryDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await request<Inventory>(
        'GET',
        `/inventory/${inventoryId}`,
        {},
        false
      );
      setData(response);
    } catch (err: any) {
      setError(err?.message || 'An error occurred while fetching inventory details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inventoryId) {
      fetchInventoryDetails();
    }
  }, [inventoryId]);

  return { data, loading, error, refetch: fetchInventoryDetails };
};