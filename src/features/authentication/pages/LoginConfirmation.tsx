import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
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
            navigate(appRoute.home);
            showToast('Account verified successfully!', 'success');
          }
        },
      }
    );
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center'
      style={{
        backgroundImage: "url('/src/assets/images/Background.png')",
      }}
    >
      {/* Container */}
      <div className='w-full max-w-lg p-6'>
        {/* Icon */}
        <div className='flex flex-col items-center sm:items-start sm:text-left mb-2 sm:mb-2'>
          <Icon name='mail' className='w-12 h-12 mb-3' fill='none' />
          <h1 className='text-xl font-bold text-center sm:text-left text-primary'>
            We just sent you an email
          </h1>
        </div>

        <p className='text-base text-tertiary font-normal text-center sm:text-left mb-8'>
          You're logging in as <span className='font-medium'>{email}</span>.{' '}
          <span
            onClick={() => {
              navigate(appRoute.login_in);
            }}
            className='text-[#2C6000] text-base font-semibold cursor-pointer'
          >
            Back to login
          </span>
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label='Security code'
            id='otp'
            type='text'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder='e.g. 123456'
          />
          <p className='text-sm text-tertiary mt-1.5'>
            Enter the verification code we sent to {email}.
          </p>

          <Button type='submit' variant='secondary' className='w-full mt-8' isLoading={isLoading} disabled={isLoading || otp.length < 6}>
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
  );
};

export default LoginConfirmation;
