type Activity = {
    timestamp: string;
    event_type: string;
    data: {
        operation_id: string;
        invoice_id?: string;
        code: string;
        operation_type: string | null;
        status: 'success' | 'pending' | 'failed' | 'overdue' | null | undefined;
        material_type?: string;
        material?: string;
    }
}

export interface RecentActivitiesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Activity[];
}

export type ChartResponse = Record<string, number>