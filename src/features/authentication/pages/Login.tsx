import { useFormik } from 'formik';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useNavigate } from 'react-router-dom';
import {
  Icon,
  Input,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import backGRD from '@/assets/images/login.png';
import { useLogin } from '@/hooks/api/mutations/authentication';
import { LoginSchema } from '@/validation-schema/auth';

const Login = () => {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      login(
        { email: values.email, password: values.password },
        {
          onSuccess: () => {
            navigate(appRoute.login_confirmation, { state: { email: values.email } });
          },
        }
      );
    },
  });

  return (
    <div className='h-screen flex flex-col md:grid md:grid-cols-2 '>
      {/* Left side - Background Image */}
      <div className='hidden md:block w-full h-screen bg-cover bg-center'>
        <img src={backGRD} alt='Logo' className='w-full h-screen py-2 px-2 ' />
      </div>

      {/* Right side - Form */}
      <div
        className='w-full flex items-center justify-center py-12 px-4 md:px-12'
        style={{
          backgroundImage: "url('/src/assets/images/Background.png')",
        }}
      >
        <Card className='w-full max-w-lg md:max-w-xl border-none shadow-none'>
          <CardHeader className='text-center md:text-left'>
            <div className='mb-4'>
              <Icon name='logo' className='w-10 h-10 mx-auto md:mx-0' />
            </div>
            <CardTitle className='font-bold text-xl text-primary'>Log in to continue</CardTitle>
            <CardDescription className='text-tertiary font-normal text-base'>
              Don't have an account?{' '}
              <span
                onClick={() => {
                  navigate(appRoute.sign_up);
                }}
                className='text-[#2C6000] text-base font-medium cursor-pointer'
              >
                Create account
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className='space-y-4' onSubmit={formik.handleSubmit}>
              <Input
                id='email'
                type='email'
                placeholder='johndoe@circulahq.com'
                label='Email'
                name='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                errorMessage={
                  formik.errors.email && formik.touched.email ? formik.errors.email : ''
                }
              />

              <div className='relative'>
                <Input
                  label='Password'
                  id='password'
                  name='password'
                  type='password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  errorMessage={
                    formik.errors.password && formik.touched.password ? formik.errors.password : ''
                  }
                  placeholder='Enter your password'
                />
                <div
                  onClick={() => {
                    navigate(appRoute.forgot_password);
                  }}
                  className='text-[#2C6000] text-sm  mt-2 font-medium cursor-pointer mb-8'
                >
                  Forgot your password?
                </div>
              </div>

              <Button
                type='submit'
                variant='secondary'
                className='w-full'
                isLoading={isLoading}
                disabled={!formik.isValid || !formik.dirty}
              >
                Continue →
              </Button>
            </form>

            <p className='text-sm mt-8 text-tertiary'>
              By logging in, you agree to our{' '}
              <a href='#' className='text-[#2C6000] hover:text-[var(--color-brand-tertiary-alt)]'>
                Terms of use
              </a>{' '}
              and{' '}
              <a href='#' className='text-[#2C6000] hover:text-[var(--color-brand-tertiary-alt)]'>
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
