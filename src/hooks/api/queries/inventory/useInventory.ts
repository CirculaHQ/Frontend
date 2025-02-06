import { useQuery } from 'react-query';
import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';

interface MaterialsResponse {

}

interface Material {

}

export const useFetchMaterials = () => {
    const fetchMaterials = async (): Promise<MaterialsResponse> => {
        return await request<MaterialsResponse>('GET', `/inventory/get_materials`, null, false, true);
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
    const fetchMaterialTypes = async (): Promise<MaterialsResponse> => {
        return await request<MaterialsResponse>('GET', `/inventory/get_material_types?material=${material}`, null, false, true);
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
    const fetchMaterialState = async (): Promise<MaterialsResponse> => {
        return await request<MaterialsResponse>('GET', `/inventory/get_material_state`, null, false, true);
    };

    return useQuery({
        queryKey: [QUERYKEYS.FETCH_MATERIAL_STATE],
        refetchOnWindowFocus: false,
        queryFn: () => fetchMaterialState(),
        select: (res) => res,
        retry: false,
    });
};
