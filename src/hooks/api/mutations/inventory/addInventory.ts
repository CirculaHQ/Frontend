import request from "@/utils/api";


interface AddInventoryPayload {
  type: string;
  date_received: string;
  vendor: string;
  customer?: string;
  material: string;
  material_type: string;
  material_state: string;
  currency: string;
  amount: string | number;
  quantity: number;
  user: string;
}

export const addInventory = async (payload: AddInventoryPayload): Promise<any> => {
  return await request<any>(
    'POST',
    '/inventory',
    payload,
    true, 
    true,
    'Inventory added successfully!'
  );
};
