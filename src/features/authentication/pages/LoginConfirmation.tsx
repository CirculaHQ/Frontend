import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { appRoute } from '@/config/routeMgt/routePaths';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { showToast } from '@/utils/toast';
import { Icon } from '@/components/ui';
import { useLoginConfirmation, useResendCode } from '@/hooks/api/mutations/authentication';

const LoginConfirmation = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const location = useLocation();
  const email = location.state?.email || '';
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(40);

  const { mutate: confirmCode, isLoading } = useLoginConfirmation();
  const { mutate: resendCode } = useResendCode();

  // Resend code timer logic
  React.useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confirmCode(
      { email, otp },
      {
        onError: (err: any) => {
          showToast(err, 'error');
        },
        onSuccess: (res: any) => {
          const result = res;
          if (
            signIn({
              token: result.access,
              tokenType: 'Bearer',
              authState: result.user,
              expiresIn: 180,
            })
          ) {
            showToast('Account verified successfully!', 'success');
          }
        },
      }
    );
  };

  return (
    <>
      <div
        className='min-h-screen flex items-center justify-center'
        style={{
          backgroundImage: "url('/src/assets/images/Background.png')",
        }}
      >
        {/* Container */}
        <div className='w-full max-w-lg p-6'>
          {/* Icon */}
          <div className='flex flex-col items-center sm:items-start sm:text-left mb-6 sm:mb-8'>
            <Icon name='mail' className='w-12 h-12 mb-3' fill='none' />
            <h1 className='text-2xl font-bold text-center sm:text-left'>
              We just sent you an email
            </h1>
          </div>

          <p className='text-base text-gray-600 text-center sm:text-left mb-6'>
            You're logging in as <span className='font-medium'>{email}</span>.{' '}
            <span
              onClick={() => {
                navigate(appRoute.login_in);
              }}
              className='text-[#2C6000] text-base font-semibold cursor-pointer'
            >
              Back to log in
            </span>
          </p>

          <form onSubmit={handleSubmit}>
            <div className='mb-5'>
              <label htmlFor='otp' className='block text-sm font-medium text-gray-700'>
                Security code
              </label>
              <Input
                id='otp'
                type='text'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder='e.g. 123456'
                className='mt-2 block w-full p-2 border border-gray-300 rounded-md focus:ring-[var(color-brand-secondary)] sm:text-sm'
              />
            </div>

            <p className='text-sm text-gray-500 mt-2'>
              Enter the verification code we sent to {email}.
            </p>

            <Button
              type='submit'
              className='w-full mt-7 bg-black text-white text-sm font-medium py-2 rounded-md hover:bg-[var(--color-brand-tertiary-alt)]'
            >
              {isLoading ? 'Verifying...' : 'Confirm Code'}
            </Button>

            <Button
              type='button'
              onClick={() => {
                resendCode(email);
                setTimer(40);
              }}
              className='w-full mt-3 border border-gray-300 bg-white text-sm text-gray-400 font-medium py-2 rounded-md hover:bg-gray-100 transition'
            >
              Resend code
            </Button>
          </form>

          <p className='text-xs text-gray-500 mt-4 text-center sm:text-left'>
            Resend code in {timer}s.
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginConfirmation;
