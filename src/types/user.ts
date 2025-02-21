export interface Account {
    id: string;
    created_at: string;
    updated_at: string;
    nickname: string;
    bank_name: string;
    account_number: string;
    account_name: string;
    notes: string;
    user: string;
}

export interface User {
    id: string;
    last_login: string | null;
    first_name: string;
    last_name: string;
    is_active: boolean;
    date_joined: string;
    created_at: string;
    updated_at: string;
    email: string;
    commodities: string[];
    organization: string;
    picture: string | null;
    phone: string;
    company_logo: string | null;
    currency: string | null;
    groups: string[];
    user_permissions: string[];
    accounts: Account[];
    role: 'super_admin' | 'admin' | 'manager' | 'operations_manager' | 'finance_manager' | 'viewer'
}
