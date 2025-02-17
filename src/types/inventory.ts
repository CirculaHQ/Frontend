interface MaterialTypes {
    [material: string]: {
        [type: string]: number;
    };
}

interface Materials {
    [material: string]: number;
}

export interface InventoryBreakdownResponse {
    total_quantity: number;
    materials: Materials;
    material_types: MaterialTypes;
    count: number;
}
