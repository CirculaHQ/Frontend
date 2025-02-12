export interface Bank {
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

export interface BanksResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Bank[];
}