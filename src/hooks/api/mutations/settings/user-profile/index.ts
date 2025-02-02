import request from "@/utils/api";

export interface UserProfile {
    first_name: string;
    last_name: string;
    email: string;
    commodities: string[];
    organization: string;
    picture: string;
    company_logo: string;
    currency: string;
    phone: string;
  }
  
  
  export const getUserProfile = async (
  ): Promise<UserProfile> => {
  
    return await request<UserProfile>(
      'GET',
      `/users/profile`,
      undefined,
      false,
      false
    );
  };

  export const updateUserProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
    return await request<UserProfile>(
      'PATCH',
      `/users/profile/update`,
      data, 
      false,
      false
    );
  };


interface updateEmail {
  email: string;
  otp: string;
}

interface Response {
  message: string;
}

export const updateEmail = async (payload: updateEmail): Promise<Response> => {
  return await request<Response>(
    'POST',
    '/users/email/update',
    payload,
    true,
    true,
    'Email updated successfully!'
  );
};

interface sendOTPEmail {
  email: string;
}

interface Response {
  message: string;
}

export const sendOTPEmail = async (payload: sendOTPEmail): Promise<Response> => {
  return await request<Response>(
    'POST',
    '/otp/send-external',
    payload,
    true,
    true,
    'OTP sent successfully!'
  );
};





interface updatePassword {
  old_password: string;
  new_password: string;
}

export const updatePassword = async (payload: updatePassword): Promise<Response> => {
  return await request<Response>(
    'POST',
    '/users/password/update',
    payload,
    true,
    true,
    'Password updated successfully!'
  );
};