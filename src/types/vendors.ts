import { Inventory } from "@/hooks/api/queries/inventory";
import { Customer } from "./customers";

export interface VendorActivities {
    id: string;
    user: Customer;
    created_at: string;
    updated_at: string;
    type: string;
    inventory: Inventory;
    operation: any | null;
    vendor: Customer;
}

export interface CustomerActivitiesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: VendorActivities[]
}