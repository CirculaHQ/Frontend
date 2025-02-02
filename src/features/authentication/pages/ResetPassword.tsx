import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle } from 'lucide-react';
import { ResetPasswordSchema } from '@/validation-schema/auth';
import { Icon } from '@/components/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForgotPassword } from '@/hooks/api/mutations/authentication';
import { appRoute } from '@/config/routeMgt/routePaths';

const ResetPassword = () => {
  const resetPassword = useForgotPassword();
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email || 'your-email@example.com';
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      resetPassword.mutate({
        email,
        password: values.password,
        confirm_password: values.password,
        otp: location.state?.otp,
      }, {
        onSuccess: () => {
          navigate(appRoute.login_in);
        },
      })
    },
  });

  // Helper function to check password criteria
  const checkPasswordCriteria = (password: string) => ({
    isLengthValid: password.length >= 8,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  });

  const passwordCriteria = checkPasswordCriteria(formik.values.password);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/src/assets/images/Background.png')",
      }}
    >
      <div className="w-full max-w-lg p-6">
        <div className="flex flex-col items-center sm:items-start sm:text-left mb-4 ">
          <Icon name='security-2' className='w-12 h-12 mb-8' />
          <h1 className="text-2xl font-bold text-center sm:text-left">
            Set a new password
          </h1>
        </div>

        <p className="text-base text-gray-600 text-center sm:text-left mb-6">
          You'll be redirected to log in after this.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-2 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <Input
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter your password"
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:ring-[var(color-brand-secondary)] sm:text-sm"
            />
           
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div className="text-sm mt-1 mb-4 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle
                className={passwordCriteria.isLengthValid ? 'text-[var(--color-success-primary)]' : 'text-gray-400'}
                size={16}
              />
              <span>Must be at least 8 characters</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle
                className={passwordCriteria.hasSpecialChar ? 'text-[var(--color-success-primary)]' : 'text-gray-400'}
                size={16}
              />
              <span>Must contain one special character</span>
            </div>
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              placeholder="Confirm your password"
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:ring-[var(color-brand-secondary)] sm:text-sm"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full mt-7 bg-black text-white text-sm font-medium py-2 rounded-md hover:bg-[var(--color-brand-tertiary-alt)]"
            disabled={!formik.isValid || !formik.dirty}
          >
            Set new password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;