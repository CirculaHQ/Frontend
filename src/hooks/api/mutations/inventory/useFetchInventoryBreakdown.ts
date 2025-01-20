import request from "@/utils/api";
import { useQuery } from "react-query";

export interface InventoryBreakdown {
  total_quantity: number;
  materials: {
    [materialName: string]: number;
  };
  material_types: {
    [materialName: string]: {
      [materialType: string]: number;
    };
  };
  count: number;
}

 const getInventoryBreakdown = async (): Promise<InventoryBreakdown> => {
  const response = await request<InventoryBreakdown>(
    'GET',
    '/inventory/breakdown',
    null,
    false,
    false
  );
  return response;
};

export const useFetchInventoryBreakdown = () => {
    const {
      data,
      isLoading,
      isError,
      error,
      refetch,
    } = useQuery<InventoryBreakdown>(
      'inventoryBreakdown', 
      getInventoryBreakdown
    );
  
    return {
      data,
      isLoading,
      isError,
      error,
      refetch,
    };
  };