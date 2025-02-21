export interface SubscriptionPlan {
    id: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    name: string;
    price_per_month: string;
    target_users: string;
    number_of_users: string;
    number_of_contacts: string;
    sustainability_report: string;
    customer_support: string;
    export_reports: boolean;
    number_of_operations: string;
    kpi_target_setting: boolean;
    material_distribution: string;
    number_of_material_types: string;
    inventory_classification: string;
    currency: string;
    number_of_invoices: string;
    overdue_notification: boolean;
    tax_discount: boolean;
    recurring: boolean;
}


export interface SubscriptionPlanResponse {
    count: number;
    next: string;
    previous: string;
    results: SubscriptionPlan[]
}