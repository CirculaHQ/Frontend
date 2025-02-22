import { AccountType } from ".";

export interface Customer {
    id: string;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    nickname: string;
    date_of_birth: string;
    business_name: string;
    phone_number: string;
    email: string;
    country: string;
    address: string;
    lga: string;
    state: string;
    bank_name: string;
    account_number: string;
    account_name: string;
    notes: string;
    photo: string;
    type?: AccountType;
    archived: boolean;
    user?: string;
    role?: string;
}

export interface AddCustomerPayload {
    first_name?: string;
    last_name?: string;
    nickname?: string;
    date_of_birth?: string;
    business_name?: string;
    phone_number?: string;
    email?: string;
    country?: string;
    address?: string;
    lga?: string;
    state?: string;
    bank_name?: string;
    account_number?: string;
    account_name?: string;
    notes?: string;
    photo?: string;
    type?: AccountType;
    user?: string;
    role?: string;
    archived?: boolean;
}

export interface CustomersResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Customer[];
}

export interface CustomersParams {
    [key: string]: string | number | boolean | undefined;
}

export interface AddCustomerResponse extends Customer {
    created_at: string;
    updated_at: string;
    archived: boolean;
}