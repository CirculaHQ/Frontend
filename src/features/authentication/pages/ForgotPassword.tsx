import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import security from '../../../assets/icons/security.svg';

// type EmailVerificationPageProps = {
//   email: string;
// };

const ForgotPassword = () => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verification code submitted:', verificationCode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
        backgroundImage: "url('/src/assets/Background.png')",
      }}>
      <div className="w-full max-w-lg p-6">
        <div className="flex flex-col items-center sm:items-start sm:text-left mb-4 sm:mb-8">
          <img src={security} alt="Email Icon" className="w-12 h-12 mb-3" />
          <h1 className="text-2xl font-bold text-center sm:text-left">Reset your password</h1>
        </div>

        <p className="text-base text-gray-600 text-center sm:text-left mb-6">
          Include the email address associated with your account and we'll send you an email with a code to rest your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="johndoe@circulahq.com"
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:ring-[var(color-brand-secondary)] sm:text-sm"
            />
          </div>

          {/* Additional Information */}
          {/* <p className="text-sm text-gray-500 mt-2">
            Enter the verification code we sent to email.
          </p> */}

          <Button type="submit" className="w-full mt-7 bg-black text-white text-sm font-medium py-2 rounded-md hover:bg-[var(--color-brand-tertiary-alt)]">
            Send verification code
          </Button>

          <Button
            type="button"
            className="w-full mt-3 border border-gray-300 bg-white text-sm text-gray-400 font-medium py-2 rounded-md hover:bg-gray-100 transition"
          >
            Back to log in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
