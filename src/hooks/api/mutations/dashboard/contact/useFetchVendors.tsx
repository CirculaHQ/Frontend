import request from '@/utils/api';
import { QUERYKEYS } from '@/utils/query-keys';
import { useQuery } from 'react-query';

type VendorDataResponse = {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      id: string;
      created_at: string;
      updated_at: string;
      first_name: string;
      last_name: string;
      nickname: string;
      date_of_birth: string;
      business_name: string;
      phone_number: string;
      email: string;
      country: string;
      address: string;
      lga: string;
      state: string;
      bank_name: string;
      account_number: string;
      account_name: string;
      notes: string;
      photo: string;
      type: string;
      archived: true;
      user: string;
    },
  ];
};

type TemplateResp = {
  success: boolean;
  message: string;
  data: {
    items: VendorDataResponse[];
    total: number;
    page: number;
    size: number;
    pages: number;
  };
};

export const FetchVendors = async (
  page: number = 1,
  perPage: number = 10
): Promise<TemplateResp> => {
  return request('GET', `/customer?page=${page}&limit=${perPage}`);
};
export const useFetchVendors = (page: number = 1, perPage: number = 10) => {
  const queryKey = [QUERYKEYS.FETCHCUSTOMERS, page, perPage];
  return useQuery(queryKey, () => FetchVendors(page, perPage), {
    retry: 1,
    keepPreviousData: true,
  });
};
