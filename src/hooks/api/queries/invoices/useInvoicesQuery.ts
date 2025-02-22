import { Invoice, InvoicesParams, InvoicesResponse, InvoicesSummary } from '@/types/invoice';
import request from '@/utils/api';
import { generateQueryParams } from '@/utils/objectFormatter';
import { QUERYKEYS } from '@/utils/query-keys';
import { useState } from 'react';
import { useQuery } from 'react-query';

const useFetchInvoices = (params: InvoicesParams) => {
  const fetchInvoices = async (): Promise<InvoicesResponse> => {
    return await request<InvoicesResponse>(
      'GET',
      `/invoices${generateQueryParams(params)}`,
      null,
      false,
      true
    );
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERYKEYS.FETCH_INVOICES, JSON.stringify(params)],
    refetchOnWindowFocus: false,
    queryFn: () => fetchInvoices(),
    select: (res) => res,
    retry: false,
    keepPreviousData: true,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const useFetchInvoice = (id: string) => {
  const fetchInvoice = async (): Promise<Invoice> => {
    return await request<Invoice>('GET', `/invoices/${id}`, null, false, true);
  };

  return useQuery<Invoice>({
    queryKey: [QUERYKEYS.FETCH_CUSTOMER, id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => fetchInvoice(),
    select: (res) => res,
    retry: false,
  });
};

const useFetchInvoicesSummary = () => {
  const fetchInvoice = async (): Promise<InvoicesSummary> => {
    return await request<InvoicesSummary>('GET', `/invoices/summary`, null, false, true);
  };

  return useQuery<InvoicesSummary>({
    queryKey: [QUERYKEYS.FETCH_INVOICES_SUMARY],
    refetchOnWindowFocus: false,
    queryFn: () => fetchInvoice(),
    select: (res) => res,
    retry: false,
  });
};

const useExportInvoices = () => {
  const [isLoading, setIsLoading] = useState(false);

  const exportInvoices = async () => {
    try {
      setIsLoading(true);
      await request<Invoice>('GET', `/invoices/export-pdf`, null, true, true, '', false, true, `Sales-`);
    } finally{
      setIsLoading(false);
    }
  };

  return { isLoading, exportInvoices };
};

export { useFetchInvoices, useFetchInvoice, useExportInvoices, useFetchInvoicesSummary };
