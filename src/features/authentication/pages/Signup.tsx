import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MultiSelect from '../components/MultiSelect';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useSignup } from '@/hooks/api/mutations/authentication';
import { Icon } from '@/components/ui';

const Signup = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    organization: '',
    commodities: [] as string[],
    password: '',
  });
  const { mutate: signup, isLoading } = useSignup();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    setFormData((prev) => ({ ...prev, password: value }));

    setIsLengthValid(value.length >= 8);
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCommoditiesChange = (selected: { value: string; label: string }[]) => {
    setFormData((prev) => ({
      ...prev,
      commodities: selected.map((item) => item.value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(formData, {
      onSuccess: (data) => {
        if (data) {
          navigate(appRoute.sign_up_confirmation, { state: { email: formData.email } });
        }
      },
      onError: (error) => {
        console.error('Signup error:', error);
      },
    });
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row my-2 md:m-2'>
      {/* Left side - Background Image */}
      <div className='hidden md:block w-full md:w-1/2 h-56 md:h-auto bg-cover bg-center'>
        <img src='/src/assets/images/login.png' alt='Logo' />
      </div>

      {/* Right side - Form */}
      <div
        className='w-full md:w-1/2 flex items-center justify-center py-12 px-4 md:px-12'
        style={{
          backgroundImage: "url('/src/assets/images/Background.png')",
        }}
      >
        <Card className='w-full max-w-lg md:max-w-xl border-none'>
          <CardHeader className='text-center md:text-left'>
            {/* Logo */}
            <div className='mb-4'>
              <Icon name='logo' className='w-10 h-10 mx-auto md:mx-0' />
            </div>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Already have an account?{' '}
              <a
                href='/login'
                className='text-[var(--color-success-primary)] hover:text-[var(--color-brand-tertiary-alt)]'
              >
                Log in
              </a>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-full md:w-1/2'>
                  <Input
                    label='First name'
                    id='first_name'
                    placeholder='e.g. John'
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className='w-full md:w-1/2'>
                  <Input
                    label='Last name'
                    id='last_name'
                    placeholder='e.g. Doe'
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <Input
                  label='Work email'
                  id='email'
                  type='email'
                  placeholder='e.g. johndoe@circulahq.com'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Input
                  label='Organization name'
                  id='organization'
                  placeholder='e.g. Circula'
                  value={formData.organization}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label className='font-normal'>What commodities do you recycle?</Label>
                <MultiSelect
                  options={[
                    { label: 'Paper/cardboard', value: 'paper' },
                    { label: 'Plastic', value: 'plastic' },
                    { label: 'Metal', value: 'metal' },
                    { label: 'Rubber', value: 'rubber' },
                    { label: 'Glass', value: 'glass' },
                    { label: 'E-waste', value: 'e-waste' },
                  ]}
                  placeholder='Select all commodities that apply'
                  onChange={handleCommoditiesChange}
                />
              </div>

              <div>
                <Input
                  label='Password'
                  type='password'
                  id='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={handlePasswordChange}
                />

                <div className='text-sm mt-3 space-y-2'>
                  <div className='flex items-center gap-2'>
                    {isLengthValid ? (
                      <CheckCircle className='text-[var(--color-success-primary)]' size={16} />
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
              </div>

              <Button
                type='submit'
                className='w-full bg-black text-white mt-3 hover:bg-[var(--color-brand-tertiary-alt)]'
                disabled={isLoading}
              >
                {isLoading ? '...' : 'Create account'}
              </Button>
            </form>

            {/* Terms and Conditions */}
            <p className='text-xs mt-4 text-gray-600'>
              By signing up, you agree to our{' '}
              <a
                href='#'
                className='text-[var(--color-success-primary)] hover:text-[var(--color-brand-tertiary-alt)]'
              >
                Terms of use
              </a>{' '}
              and{' '}
              <a
                href='#'
                className='text-[var(--color-success-primary)] hover:text-[var(--color-brand-tertiary-alt)]'
              >
                Privacy policy
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
