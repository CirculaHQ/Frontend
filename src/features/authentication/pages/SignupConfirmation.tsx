import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import mail from '../../../assets/icons/mail.svg';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useLocation, useNavigate} from 'react-router-dom';
import useVerifySignup from '../hooks/useVerifySignup';
import useResendCode from '../hooks/useResendCode';


const SignupConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your-email@example.com';
  const [verificationCode, setVerificationCode] = useState('');
  const [timer, setTimer] = useState(40);

  const { mutate: verifySignup } = useVerifySignup();
  const { mutate: resendCode } = useResendCode();
  
  // Resend code timer logic
  React.useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    verifySignup(
      { email, otp: verificationCode },
      {
        onSuccess: (data) => {
          localStorage.setItem('user-token', data.access);
          navigate(appRoute.home);
        },
        onError: (error) => {
          console.error('Verification error:', error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
        backgroundImage: "url('/src/assets/Background.png')",
      }}>
      {/* Container */}
      <div className="w-full max-w-lg p-6">
        {/* Icon */}
        <div className="flex flex-col items-center sm:items-start sm:text-left mb-6 sm:mb-8">
          <img src={mail} alt="Email Icon" className="w-12 h-12 mb-3" />
          <h1 className="text-2xl font-bold text-center sm:text-left">Check your email</h1>
        </div>

        <p className="text-base text-gray-600 text-center sm:text-left mb-6">
          We sent a code to <span className="font-medium">{email}</span>.{' '}
          <a
            href={appRoute.sign_up}
            className="text-[var(--color-success-primary)] hover:text-[var(--color-brand-tertiary-alt)]"
          >
            Change email
          </a>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
              Verification code
            </label>
            <Input
              id="verificationCode"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="e.g. 123456"
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:ring-[var(color-brand-secondary)] sm:text-sm"
            />
          </div>

          <p className="text-sm text-gray-500 mt-2">
            If you do not see the email, you can check your spam folder, request a new code, or verify that your email is correct.
          </p>

          <Button type="submit" className="w-full mt-7 bg-black text-white text-sm font-medium py-2 rounded-md hover:bg-[var(--color-brand-tertiary-alt)]">
            Verify account
          </Button>

          <Button
            type="button"
            onClick={() => {
              resendCode(email);
              setTimer(40);
            }}
            className="w-full mt-3 border border-gray-300 bg-white text-sm text-gray-400 font-medium py-2 rounded-md hover:bg-gray-100 transition"
          >
            Resend code
          </Button>
        </form>
        
        <p className="text-xs text-gray-500 mt-4 text-center sm:text-left">
          Resend code in {timer}s.
        </p>
      </div>
    </div>
  );
};

export default SignupConfirmation;
