import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/ui';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { EmailSchema } from '@/validation-schema/auth';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: EmailSchema,
    onSubmit: (values) => {
      navigate(appRoute.sign_up_confirmation, { state: { email: values.email, from: 'forgotPassword' } });
    },
  });

  return (
    <div
      className='min-h-screen flex items-center justify-center'
      style={{
        backgroundImage: "url('/src/assets/images/Background.png')",
      }}
    >
      <div className='w-full max-w-lg p-6'>
        <div className='flex flex-col items-center sm:items-start sm:text-left mb-2 sm:mb-2 '>
          <Icon name='security-2' className='w-12 h-12 mb-8' />
          <h1 className='text-2xl text-primary font-bold text-center sm:text-left'>
            Reset your password
          </h1>
        </div>

        <p className='text-base text-tertiary text-center sm:text-left mb-4'>
          Include the email address associated with your account and we'll send you an email with a
          code to rest your password.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <Input
              id='email'
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='johndoe@circulahq.com'
              className='mt-2 block w-full p-2 border border-gray-300 rounded-md focus:ring-[var(color-brand-secondary)] sm:text-sm'
            />
          </div>

          <Button
            type='submit'
            disabled={!formik.isValid || !formik.dirty}
            className='w-full mt-8 bg-black text-white text-sm font-medium py-2 rounded-md hover:bg-[var(--color-brand-tertiary-alt)]'
          >
            Send verification code
          </Button>

          <Button
            type='button'
            className='w-full mt-3 border border-gray-300 bg-white text-sm text-gray-400 font-medium py-2 rounded-md hover:bg-gray-100 transition'
            onClick={() => navigate(appRoute.login_in)}
          >
            Back to log in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
