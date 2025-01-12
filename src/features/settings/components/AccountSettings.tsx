import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormSection } from '@/components/shared';
import { Button, Input } from '@/components/ui';
import { CheckCircle } from 'lucide-react';
import { appRoute } from '@/config/routeMgt/routePaths';
import { getUserProfile, sendOTPEmail, updatePassword } from '@/hooks/api/mutations/settings/user-profile';
import { useMutation } from 'react-query';

interface AccountSettingsProps {
  // props needed from the parent component e.e userID
}

const AccountSettings: React.FC<AccountSettingsProps> = () => {
  const navigate = useNavigate();
  const [oldEmail, setOldEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [showEmailButtons, setShowEmailButtons] = useState(false);
  const [showPasswordButtons, setShowPasswordButtons] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setOldEmail(profile.email);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const { mutate: updatePasswordMutation, isLoading: isUpdatingPassword } = useMutation(
    async () => {
      return await updatePassword({ old_password: password, new_password: newPassword });
    },
    {
      onSuccess: () => {
        setPassword('');
        setNewPassword('');
        setShowPasswordButtons(false);
      },
      onError: (error: any) => {
        console.log(error);
        },
    }
  );

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);

    setIsLengthValid(value.length >= 8);
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(value));
    setShowPasswordButtons(true);
  };

  const handleNewEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewEmail(value);
    setShowEmailButtons(value !== '');
  };

  const handleCancelEmailUpdate = () => {
    setNewEmail('');
    setShowEmailButtons(false);
  };

  const handleCancelPasswordUpdate = () => {
    setPassword('');
    setNewPassword('');
    setIsLengthValid(false);
    setHasSpecialChar(false);
    setShowPasswordButtons(false);
  };

  const { mutate: sendOTP } = useMutation(sendOTPEmail, {
    onSuccess: () => {
      navigate(appRoute.sign_up_confirmation, { 
        state: { email: newEmail, from: 'accountSettings' } 
      });
    },
    onError: (error: any) => {
      console.error('Error sending OTP:', error);
    }
  });

  const handleUpdateEmail = () => {
    sendOTP({ email: newEmail }); 
  };

  const handleUpdatePassword = () => {
    updatePasswordMutation();
  };

  return (
    <>
      <div className='flex flex-col items-start mb-8'>
        <h2 className='text-lg font-semibold text-primary'>Account settings</h2>
        <p className='text-tertiary font-normal text-sm'>
          Manage your team members and their account permissions here.
        </p>
      </div>
      <FormSection title='Email address' description='Supporting text goes here'>
        <Input
          id='email'
          type='email'
          placeholder='olivia@untitledui.com'
          label='Current email address'
          name='email'
          value={oldEmail}
          readOnly
        />

        <Input
          id='new_email'
          type='email'
          placeholder='e.g johndoe@circulahq.com'
          label='New email address'
          name='new_email'
          value={newEmail}
          onChange={handleNewEmailChange}
        />
      </FormSection>
      {showEmailButtons && (
        <div className='flex justify-end gap-4 mt-8'>
          <Button variant='outline' onClick={handleCancelEmailUpdate}>
            Cancel
          </Button>
          <Button type='button' variant='secondary' onClick={handleUpdateEmail}>
            Update email
          </Button>
        </div>
      )}

      <FormSection title='Password' description='Supporting text goes here'>
        <Input
          id='password'
          type='password'
          placeholder='Enter your password'
          label='Current password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          onClick={() => {
            navigate(appRoute.forgot_password);
          }}
          className='text-[#2C6000] text-sm mt-2 font-medium cursor-pointer'
        >
          Forgot your password?
        </div>

        <Input
          id='new-password'
          type='password'
          placeholder='Enter your new password'
          label='New password'
          name='new-password'
          value={newPassword}
          onChange={handlePasswordChange}
        />
        <div className='text-sm mt-3 space-y-2'>
          <div className='flex items-center gap-2'>
            {isLengthValid ? (
              <CheckCircle className='text-green-500' size={16} />
            ) : (
              <CheckCircle className='text-gray-400' size={16} />
            )}
            <span>Must be at least 8 characters</span>
          </div>
          <div className='flex items-center gap-2'>
            {hasSpecialChar ? (
              <CheckCircle className='text-green-500' size={16} />
            ) : (
              <CheckCircle className='text-gray-400' size={16} />
            )}
            <span>Must contain one special character</span>
          </div>
        </div>
      </FormSection>
      {showPasswordButtons && (
        <div className='flex justify-end gap-4 mt-8'>
          <Button variant='outline' onClick={handleCancelPasswordUpdate}>
            Cancel
          </Button>
          <Button type='button' variant='secondary' onClick={handleUpdatePassword} disabled={isUpdatingPassword}>
          {isUpdatingPassword ? 'Updating...' : 'Update password'}
          </Button>
        </div>
      )}
      <FormSection title='Export your data' description='Supporting text goes here'>
        <Button variant='outline'>Export data</Button>
      </FormSection>
    </>
  );
};

export default AccountSettings;
