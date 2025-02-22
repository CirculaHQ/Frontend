import { ROLE_IN_VALUE_CHAIN } from "@/config/common";
import { Inventory } from "@/hooks/api/queries/inventory";

export const generateQueryParams = (params: Record<string, any>): string => {
  const query = new URLSearchParams(Object.entries(params).filter(([_, value]) => value !== ''));
  return `?${query.toString()}`;
};

export function removeEmptyStrings<T extends Record<string, any>>(obj: T): T {
  return Object.entries(obj)
    .filter(([_, value]) => value !== '')
    .reduce((acc, [key, value]) => {
      acc[key as keyof T] = value;
      return acc;
    }, {} as T);
}

export function areMaterialTypesSame(data: Inventory[]): boolean {
  if (data.length < 2) return false;

  const firstMaterialType = data[0].material_type;
  const firstMaterialState = data[0].material_state;
  
  // Check if all material_types are the same
  const typeTest = data.every(item => item.material_type === firstMaterialType)
  const stateTest = data.every(item => item.material_state === firstMaterialState)

  return typeTest && stateTest;
}

export const getRoleInValueChain = (role: string) => {
  if (!role) return 'N/A'
  const r = ROLE_IN_VALUE_CHAIN.find((item) => item.value === role)
  return r?.name ?? ''
}