import { Customer, CustomerActivitiesResponse, CustomersParams, CustomersResponse } from '@/types/customers';
import request from '@/utils/api';
import { generateQueryParams } from '@/utils/objectFormatter';
import { QUERYKEYS } from '@/utils/query-keys';
import { useState } from 'react';
import { useQuery } from 'react-query';

const useFetchCustomers = (params: CustomersParams) => {
  const fetchCustomers = async (): Promise<CustomersResponse> => {
    return await request<CustomersResponse>(
      'GET',
      `/customer${generateQueryParams(params)}`,
      null,
      false,
      true
    );
  };

  return useQuery({
    queryKey: [QUERYKEYS.FETCH_CUSTOMERS, JSON.stringify(params)],
    refetchOnWindowFocus: false,
    queryFn: () => fetchCustomers(),
    select: (res) => res,
    retry: false,
    keepPreviousData: true,
  });
};

const useFetchCustomer = (id?: string) => {
  const fetchCustomer = async (): Promise<Customer> => {
    return await request<Customer>('GET', `/customer/${id}`, null, false, true);
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

const useFetchCustomerActivity = (id?: string) => {
  const fetchCustomerActivity = async (): Promise<CustomerActivitiesResponse> => {
    return await request<CustomerActivitiesResponse>('GET', `/customer/${id}/activities`, null, false, true);
  };

  return useQuery<CustomerActivitiesResponse>({
    queryKey: [QUERYKEYS.FETCH_CUSTOMER_ACTIVITIES, id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => fetchCustomerActivity(),
    select: (res) => res,
    retry: false,
  });
};

const useExportCustomers = () => {
  const [isLoading, setIsLoading] = useState(false);

  const exportCustomers = async () => {
    try {
      setIsLoading(true);
      await request<Customer>('GET', `/customer/export`, null, true, true, '', false, true, `Customers-`);
    } finally{
      setIsLoading(false);
    }
  };

  return { isLoading, exportCustomers };
};

export {
  useFetchCustomers,
  useFetchCustomer,
  useExportCustomers,
  useFetchCustomerActivity
};
