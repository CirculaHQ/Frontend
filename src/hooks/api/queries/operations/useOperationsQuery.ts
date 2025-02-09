import { Operation, OperationsResponse, OperationType } from "@/types/operations";
import request from "@/utils/api";
import { QUERYKEYS } from "@/utils/query-keys";
import { useQuery } from "react-query";

export const useFetchOperationTypes = () => {
    const fetchOperationTypes = async (): Promise<OperationType[]> => {
        return await request<OperationType[]>('GET', `/operations/get_operation_types`, null, false, true);
    };

    return useQuery({
        queryKey: [QUERYKEYS.FETCH_OPERATION_TYPES],
        refetchOnWindowFocus: false,
        queryFn: () => fetchOperationTypes(),
        select: (res) => res,
        retry: false,
    });
};

export const useFetchOperationsByBatch = (batchId: string) => {
    const fetchOperationsByBatch = async (): Promise<OperationsResponse> => {
        return await request<OperationsResponse>('GET', `/operations?batch=${batchId}`, null, false, false);
    };

    return useQuery({
        queryKey: [QUERYKEYS.FETCH_OPERATIONS_BY_BATCH, batchId],
        refetchOnWindowFocus: false,
        enabled: !!batchId,
        queryFn: () => fetchOperationsByBatch(),
        select: (res) => res,
        retry: false,
    });
};

export const useFetchOperation = (operationId: string) => {
    const fetchOperationsByBatch = async (): Promise<Operation> => {
        return await request<Operation>('GET', `/operations/${operationId}`, null, false, false);
    };

    return useQuery({
        queryKey: [QUERYKEYS.FETCH_OPERATION_BY_ID, operationId],
        refetchOnWindowFocus: false,
        enabled: !!operationId,
        queryFn: () => fetchOperationsByBatch(),
        select: (res) => res,
        retry: false,
    });
};