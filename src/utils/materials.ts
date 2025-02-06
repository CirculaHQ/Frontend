import { materials } from '../config/materials'

export const getMaterialColor = (material: string) => {
    return materials.find((item: any) => item.name === material)?.backgroundColor ?? '';
};