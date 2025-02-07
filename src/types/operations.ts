export interface Operation {
}

export interface Batch {
    id: string;
    created_at: string;
    updated_at: string;
    code: string;
    operation_type: string | null;
    start_date: string | null;
    start_time: string | null;
    end_date: string | null;
    end_time: string | null;
    input_quantity: number;
    quantity_produced: number;
    waste_produced: number;
    quantity_left: number;
    status: 'ongoing' | 'done' | 'ready';
    input_quantities: number[];
    user: string;
    batch: string | null;
    input_source: string | null;
    inventories: string[]
}

export interface CreateBatchPayload {
    user: string;
    inventories: string[];
    input_quantities: number[];
}

export interface CreateBatchResponse extends Batch {
}

export interface CustomersParams {
    [key: string]: string | number | boolean | undefined;
}