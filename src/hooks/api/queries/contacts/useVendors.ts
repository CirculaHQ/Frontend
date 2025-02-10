import { Customer, CustomersParams, CustomersResponse } from '@/types/customers';
import request from '@/utils/api';
import { generateQueryParams } from '@/utils/objectFormatter';
import { QUERYKEYS } from '@/utils/query-keys';
import { useState } from 'react';
import { useQuery } from 'react-query';

const useFetchVendors = (params: CustomersParams) => {
  const fetchVendors = async (): Promise<CustomersResponse> => {
    return await request<CustomersResponse>(
      'GET',
      `/vendor${generateQueryParams(params)}`,
      null,
      false,
      true
    );
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERYKEYS.FETCH_VENDORS, JSON.stringify(params)],
    refetchOnWindowFocus: false,
    queryFn: () => fetchVendors(),
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

const useFetchVendor = (id?: string) => {
  const fetchVendor = async (): Promise<Customer> => {
    return await request<Customer>('GET', `/vendor/${id}`, null, false, true);
  };

  return useQuery<Customer>({
    queryKey: [QUERYKEYS.FETCH_VENDOR, id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => fetchVendor(),
    select: (res) => res,
    retry: false,
  });
};

const useExportVendors = () => {
  const [isLoading, setIsLoading] = useState(false);

  const exportVendors = async () => {
    setIsLoading(true);
    await request<Customer>('GET', `/vendor/export`, null, true, true, '', false, true);
    setIsLoading(false);
  };

  return { isLoading, exportVendors };
};

export { useFetchVendors, useFetchVendor, useExportVendors };
