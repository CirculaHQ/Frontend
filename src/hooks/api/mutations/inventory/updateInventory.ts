import request from "@/utils/api";

interface UpdateInventoryPayload {
  id: string;
  type?: string;
  date_received?: string;
  vendor?: string;
  customer?: string;
  material?: string;
  material_type?: string;
  material_state?: string;
  currency?: string;
  amount?: string | number;
  quantity?: number;
  user?: string; 
}

export const updateInventory = async (payload: UpdateInventoryPayload): Promise<any> => {
  const { id, ...updateData } = payload; 

  return await request<any>(
    'PUT',
    `/inventory/${id}`, 
    updateData, 
    true,
    true,
    'Inventory updated successfully!'
  );
};