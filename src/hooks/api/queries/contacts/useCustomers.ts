import { Customer, CustomersParams, CustomersResponse } from '@/types/customers';
import request from '@/utils/api';
import { generateQueryParams } from '@/utils/objectFormatter';
import { QUERYKEYS } from '@/utils/query-keys';
import { useState } from 'react';
import { useQuery } from 'react-query';

const useFetchCustomers = (params: CustomersParams) => {
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  const fetchCustomers = async (): Promise<CustomersResponse> => {
    return await request<CustomersResponse>('GET', `/customer${generateQueryParams(params)}`, "", false, true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERYKEYS.FETCH_CUSTOMERS, JSON.stringify(params)],
    refetchOnWindowFocus: false,
    queryFn: () => fetchCustomers(),
    select: (res) => res,
    retry: false,
    onSuccess: () => {
      setIsInitialFetch(false);
    },
  });

  return {
    data,
    isInitialFetch,
    isLoading,
    isError,
    error
  };
};

const useFetchCustomer = (id?: string) => {
  const fetchCustomer = async (): Promise<Customer> => {
    return await request<Customer>('GET', `/customer/${id}`, "", false, true);
  };

  return useQuery<Customer>({
    queryKey: [QUERYKEYS.FETCH_CUSTOMER, id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => fetchCustomer(),
    select: (res) => res,
    retry: false,
  });
};

export {
  useFetchCustomers,
  useFetchCustomer
};
