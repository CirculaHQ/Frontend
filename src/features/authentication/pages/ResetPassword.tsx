import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import security from '../../../assets/icons/security.svg';
import { CheckCircle } from 'lucide-react';

// type EmailVerificationPageProps = {
//   email: string;
// };

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    setIsLengthValid(value.length >= 8);
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(value));
  };

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     console.log('Verification code submitted:', verificationCode);
  //   };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/src/assets/Background.png')",
      }}
    >
      <div className="w-full max-w-lg p-6">
        <div className="flex flex-col items-center sm:items-start sm:text-left mb-4 sm:mb-8">
          <img src={security} alt="Email Icon" className="w-12 h-12 mb-3" />
          <h1 className="text-2xl font-bold text-center sm:text-left">
            Set a new password
          </h1>
        </div>

        <p className="text-base text-gray-600 text-center sm:text-left mb-6">
          You'll be redirected to log in after this.
        </p>

        <form>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:ring-[var(color-brand-secondary)] sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 text-sm text-[var(--color-success-primary)] hover:text-[var(--color-brand-tertiary-alt)]"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="text-sm mt-1 mb-4 space-y-2">
            <div className="flex items-center gap-2">
              {isLengthValid ? (
                <CheckCircle
                  className="text-[var(--color-success-primary)]"
                  size={16}
                />
              ) : (
                <CheckCircle className="text-gray-400" size={16} />
              )}
              <span>Must be at least 8 characters</span>
            </div>
            <div className="flex items-center gap-2">
              {hasSpecialChar ? (
                <CheckCircle className="text-green-500" size={16} />
              ) : (
                <CheckCircle className="text-gray-400" size={16} />
              )}
              <span>Must contain one special character</span>
            </div>
          </div>

          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:ring-[var(color-brand-secondary)] sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 text-sm text-[var(--color-success-primary)] hover:text-[var(--color-brand-tertiary-alt)]"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* <p className="text-sm text-gray-500 mt-2">
            Enter the verification code we sent to email.
          </p> */}

          <Button
            type="submit"
            className="w-full mt-7 bg-black text-white text-sm font-medium py-2 rounded-md hover:bg-[var(--color-brand-tertiary-alt)]"
          >
            Set new password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
