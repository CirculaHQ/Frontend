import { useQuery } from 'react-query';
import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';
import { InventoryBreakdownResponse } from '@/types/inventory';
import { generateQueryParams } from '@/utils/objectFormatter';
import { useState } from 'react';

interface Material {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    material?: string;
}

export const useFetchMaterials = () => {
    const fetchMaterials = async (): Promise<Material[]> => {
        return await request<Material[]>('GET', `/inventory/get_materials`, null, false, true);
    };

    return useQuery({
        queryKey: [QUERYKEYS.FETCH_MATERIALS],
        refetchOnWindowFocus: false,
        queryFn: () => fetchMaterials(),
        select: (res) => res,
        retry: false,
    });
};

export const useFetchMaterialTypes = (material: string) => {
    const fetchMaterialTypes = async (): Promise<Material[]> => {
        return await request<Material[]>('GET', `/inventory/get_material_types?material=${material}`, null, false, true);
    };

    return useQuery({
        queryKey: [QUERYKEYS.FETCH_MATERIAL_TYPES, material],
        enabled: !!material,
        refetchOnWindowFocus: false,
        queryFn: () => fetchMaterialTypes(),
        select: (res) => res,
        retry: false,
    });
};

export const useFetchMaterialState = () => {
    const fetchMaterialState = async (): Promise<Material[]> => {
        return await request<Material[]>('GET', `/inventory/get_material_state`, null, false, true);
    };

    return useQuery({
        queryKey: [QUERYKEYS.FETCH_MATERIAL_STATE],
        refetchOnWindowFocus: false,
        queryFn: () => fetchMaterialState(),
        select: (res) => res,
        retry: false,
    });
};

export const useFetchInventoryBreakdown = (params: any) => {
    const fetchInventoryBreakdown = async (): Promise<InventoryBreakdownResponse> => {
        return await request<InventoryBreakdownResponse>('GET', `/inventory/breakdown${generateQueryParams(params)}`, null, false, true);
    };

    return useQuery({
        queryKey: [QUERYKEYS.FETCH_INVENTORY_BREAKDOWN, params],
        refetchOnWindowFocus: false,
        queryFn: () => fetchInventoryBreakdown(),
        select: (res) => res,
        retry: false,
    });
};

export const useExportInventory = () => {
    const [isLoading, setIsLoading] = useState(false);

    const exportInventory = async () => {
        try {
            setIsLoading(true);
            await request<any>('GET', `/inventory/export-pdf`, null, true, true, '', false, true, `Inventory-`);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, exportInventory };
};