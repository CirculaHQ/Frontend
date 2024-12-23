import request from "@/utils/api";

export const deleteInventory = async (id: string): Promise<any> => {
  return await request<any>(
    'DELETE',
    `/inventory/${id}`,
    null,
    true,
    true,
    'Inventory deleted successfully!'
  );
};