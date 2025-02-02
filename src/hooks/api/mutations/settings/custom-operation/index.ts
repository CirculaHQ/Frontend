import request from "@/utils/api";

export interface CustomOperation {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  user: string;
}

interface GetBanksResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CustomOperation[];
}


export const getCustomOperations = async (
  limit: number = 100,
  offset: number = 0,
  name: string
): Promise<GetBanksResponse> => {
  const queryParams = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
      ...(name && { name }) 
  }).toString();

  return await request<GetBanksResponse>(
    'GET',
    `/custom_operation?${queryParams}`, 
    undefined,
    false,
    false
  );
};

interface AddCustomOperation {
  name: string;
  user: string;
}

export const addCustomOperation = async (payload: AddCustomOperation): Promise<CustomOperation> => {
  return await request<CustomOperation>(
    'POST',
    '/custom_operation',
    payload,
    true,
    true,
    'Custom Operation added successfully!'
  );
};

interface UpdateCustomOperation {
  name: string;
}

export const updateCustomOperation = async (id: string, payload: UpdateCustomOperation): Promise<CustomOperation> => {
  return await request<CustomOperation>(
    'PATCH',
    `/custom_operation/${id}`,
    payload,
    true,
    true,
    'Custom Operation updated successfully!'
  );
};

export const deleteCustomOperation = async (id: string): Promise<void> => {
  return await request<void>(
    'DELETE',
    `/custom_operation/${id}`,
    undefined,
    true,
    true,
    'Custom Operation deleted successfully!'
  );
};