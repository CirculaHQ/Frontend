export interface Operation {
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

export interface OperationType {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
}

export interface OperationsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Operation[];
}

export interface CreateBatchPayload {
    user: string;
    inventories: string[];
    input_quantities: number[];
}

export interface CreateBatchResponse extends Operation {
}

export interface AddSubOperationPayload {
    operation_type: string;
    user: string;
    start_date: string | null;
    start_time: string | null;
    end_date: string | null;
    end_time: string | null;
    input_quantity: number;
    quantity_produced: number;
    waste_produced: number;
    batch: string;
    input_source: string;
    status?: "ongoing" | "completed";
}

export interface AddSubOperationResponse {
    id: string;
    created_at: string;
    updated_at: string;
    code: string;
    operation_type: string;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
    input_quantity: number;
    quantity_produced: number;
    waste_produced: number;
    quantity_left: number;
    status: "ongoing" | "completed";
    input_quantities: number[];
    user: string;
    batch: string;
    input_source: string;
    inventories: string[];
}

export interface CustomersParams {
    [key: string]: string | number | boolean | undefined;
}

interface MaterialData {
    total: number;
    materials: {
        [material: string]: number;
    };
}

export interface OperationsBreakdownResponse {
    produced: MaterialData;
    waste: MaterialData;
    operations: MaterialData;
}