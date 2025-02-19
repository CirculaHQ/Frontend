import { Customer } from "./customers";

export interface LineItem {
    id?: string;
    item_name: string;
    quantity: number;
    unit_price: number;
    amount?: number;
}

type Breakdown = {
    item_name: string,
    quantity: number,
    unit_price: number
}

export interface CreateInvoicePayload {
    due_date: string;
    title: string;
    currency: string;
    breakdown: Breakdown[];
    tax: string;
    discount: string;
    notes: string;
    user: string;
    customer: string;
    account: string;
    status?: string;
}

export interface Invoice {
    id: string;
    breakdown: Breakdown[];
    created_at: string;
    updated_at: string;
    code: string;
    due_date: string;
    title: string;
    currency: string;
    tax: string;
    discount: string;
    notes: string;
    status: 'success' | 'pending' | 'failed' | 'overdue' | null | undefined;
    user: string;
    total: string;
    customer: Customer;
    account: {
        account_name: string;
        account_number: string;
    };
}

export interface InvoicesResponse {
    count: number;
    next: string;
    previous: string;
    results: Invoice[]
}

export interface InvoicesParams {

}

export interface CurrencyInvoice {
    fulfilled: {
        count: number;
        total: number;
    };
    pending: {
        count: number;
        total: number;
    };
    overdue: {
        count: number;
        total: number;
    };
    total: number;
}

export interface InvoicesSummary {
    [currencyCode: string]: CurrencyInvoice;
}