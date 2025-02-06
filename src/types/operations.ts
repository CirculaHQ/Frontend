export interface Operation {
}

export interface Batch {
}

export interface CreateBatchPayload {
    user: string;
    inventories: string[];
    input_quantities: number[];
}

export interface CreateBatchResponse {
    id: string;
    created_at: Date;
    updated_at: Date;
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
    status: 'ongoing' | 'done' | 'ready';
    user: string;
    batch: string;
    input_source: string;
    inventories: string[];
}

export interface CustomersParams {
    [key: string]: string | number | boolean | undefined;
}

// export interface AddCustomerResponse extends Customer {
//     created_at: string;
//     updated_at: string;
//     archived: boolean;
// }