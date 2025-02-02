import request from "@/utils/api";

export interface CustomMaterial {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  user: string;
//   types: CustomMaterialType[];
}

interface GetCustomMaterialsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CustomMaterial[];
}

export const getCustomMaterials = async (
  limit: number = 10,
  offset: number = 0,
  name: string = ""
): Promise<GetCustomMaterialsResponse> => {
  const queryParams = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
      ...(name && { name }) 
  }).toString();

  return await request<GetCustomMaterialsResponse>(
    'GET',
    `/custom_material?${queryParams}`,
    undefined,
    false,
    false
  );
};

interface AddCustomMaterialPayload {
  name: string;
  user: string;
}

export const addCustomMaterial = async (payload: AddCustomMaterialPayload): Promise<CustomMaterial> => {
  return await request<CustomMaterial>(
    'POST',
    '/custom_material',
    payload,
    true,
    true,
    'Custom Material added successfully!'
  );
};

interface UpdateCustomMaterialPayload {
  name: string;
}

export const updateCustomMaterial = async (
  id: string,
  payload: UpdateCustomMaterialPayload
): Promise<CustomMaterial> => {
  return await request<CustomMaterial>(
    'PATCH',
    `/custom_material/${id}`,
    payload,
    true,
    true,
    'Custom Material updated successfully!'
  );
};

export const deleteCustomMaterial = async (id: string): Promise<void> => {
  return await request<void>(
    'DELETE',
    `/custom_material/${id}`,
    undefined,
    true,
    true,
    'Custom Material deleted successfully!'
  );
};




export interface CustomMaterialType {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  material: string;
}

interface GetCustomMaterialTypesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CustomMaterialType[];
}

export const getCustomMaterialTypes = async (
  limit: number = 10,
  offset: number = 0,
  materialId: string
): Promise<GetCustomMaterialTypesResponse> => {
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
    material: materialId
  }).toString();

  return await request<GetCustomMaterialTypesResponse>(
    'GET',
    `/custom_material_type?${queryParams}`,
    undefined,
    false,
    false
  );
};

interface AddCustomMaterialTypePayload {
  name: string;
  user: string;
  material: string; 
}

export const addCustomMaterialType = async (
  payload: AddCustomMaterialTypePayload
): Promise<CustomMaterialType> => {
  return await request<CustomMaterialType>(
    'POST',
    '/custom_material_type',
    payload,
    true,
    true,
    'Custom Material Type added successfully!'
  );
};

interface UpdateCustomMaterialTypePayload {
  name: string;
}

export const updateCustomMaterialType = async (
  id: string,
  payload: UpdateCustomMaterialTypePayload
): Promise<CustomMaterialType> => {
  return await request<CustomMaterialType>(
    'PATCH',
    `/custom_material_type/${id}`,
    payload,
    true,
    true,
    'Custom Material Type updated successfully!'
  );
};

export const deleteCustomMaterialType = async (id: string): Promise<void> => {
  return await request<void>(
    'DELETE',
    `/custom_material_type/${id}`,
    undefined,
    true,
    true,
    'Custom Material Type deleted successfully!'
  );
};