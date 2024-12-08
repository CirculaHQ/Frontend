import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { appRoute } from '@/config/routeMgt/routePaths';
import useLogin from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isLoading } = useLogin();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password }, {
      onSuccess: (data) => {
        if (data) {
          navigate(appRoute.login_confirmation, { state: { email: email } });
        }
      },
      onError: (error) => {
        console.error('Signup error:', error);
      },
    }

    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row m-2">
      {/* Left side - Background Image */}
      <div className="hidden md:block w-full md:w-1/2 h-28 md:h-auto bg-cover bg-center">
        <img src="/src/assets/Frame 8.png" alt="Logo" />
      </div>

      {/* Right side - Form */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center py-12 px-6 md:px-12"
        style={{
          backgroundImage: "url('/src/assets/Background.png')",
        }}
      >
        <Card className="w-full max-w-lg md:max-w-xl border-none">
          <CardHeader className="text-center md:text-left">
            <div className="mb-4">
              <img
                src="/src/assets/Logo.png"
                alt="Logo"
                className="w-10 h-10 mx-auto md:mx-0"
              />
            </div>
            <CardTitle>Log in to continue</CardTitle>
            <CardDescription>
              Don't have an account?{' '}
              <a
                href={appRoute.sign_up}
                className="text-[var(--color-success-primary)] hover:text-[var(--color-brand-tertiary-alt)]"
              >
                Create account
              </a>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="font-normal">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@circulahq.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="password" className="font-normal">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 text-sm text-[var(--color-success-primary)] hover:text-[var(--color-brand-tertiary-alt)]"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <p className="text-xs mt-4 text-gray-600">
                  <a
                    href={appRoute.forgot_password}
                    className="text-[var(--color-success-primary)] hover:text-[var(--color-brand-tertiary-alt)]"
                  >
                    Forgot your password?
                  </a>
                </p>
              </div>

              <Button
                type="submit"
                className="w-full text-white mt-3 hover:bg-[var(--color-brand-tertiary-alt)]"
              >
                {isLoading ? 'Logging in...' : 'Continue →'}
              </Button>
            </form>

            <p className="text-xs mt-4 text-gray-600">
              By logging in, you agree to our{' '}
              <a
                href="#"
                className="text-[var(--color-success-primary)] hover:text-[var(--color-brand-tertiary-alt)]"
              >
                Terms of use
              </a>{' '}
              and{' '}
              <a
                href="#"
                className="text-[var(--color-success-primary)] hover:text-[var(--color-brand-tertiary-alt)]"
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

export default Login;
