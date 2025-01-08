import request from "@/utils/api";

interface AddBankPayload {
  user: string;
  nickname: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  notes: string;
}

export const addBank = async (payload: AddBankPayload): Promise<any> => {
  return await request<any>(
    'POST',
    '/bank',
    payload,
    true,
    true,
    'Bank added successfully!'
  );
};
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

interface GetBanksResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Bank[];
}

export const getBanks = async (
  limit: number = 50, 
  offset: number = 0  
): Promise<GetBanksResponse> => {
    const queryParams = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
    }).toString();

  return await request<GetBanksResponse>(
    'GET',
    `/bank?${queryParams}`,
    undefined,
    false,
    false
  );
};

interface EditBankPayload {
    nickname?: string;
    bank_name?: string;
    account_number?: string;
    account_name?: string;
    notes?: string;
  }
  
  export const editBank = async (
    bankId: string,
    payload: EditBankPayload
  ): Promise<Bank> => {
    return await request<Bank>(
      'PATCH', 
      `/bank/${bankId}`,
      payload,
      true,
      true,
      'Bank updated successfully!'
    );
  };

  export const deleteBank = async (bankId: string): Promise<any> => {
    return await request<any>(
      'DELETE',
      `/bank/${bankId}`,
      undefined,
      true,
      true,
      'Bank deleted successfully!'
    );
  };