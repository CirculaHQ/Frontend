export interface Role {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    description: string;
}

export interface Member {
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
    picture: string | null;
    phone: string | null;
    currency: string | null;
    role: 'super_admin' | 'admin' | 'manager' | 'operations_manager' | 'finance_manager' | 'viewer';
    organization: string;
    groups: string[];
    user_permissions: string[];
}

export interface MembersResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Member[];
}

export interface AddMemberPayload {
    first_name: string;
    last_name: string;
    role: string;
    email: string;
}