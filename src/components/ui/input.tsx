import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  tag?: string;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, tag, errorMessage, containerClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password';

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && <label className='text-sm font-medium text-secondary'>{label}</label>}
        <div className={cn('flex flex-col gap-1.5 relative w-full', containerClassName)}>
          <input
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            className={cn(
              'flex h-10 w-full shadow-sm rounded-md border border-[#D5D7DA] bg-background px-3 py-2 text-base focus:border-2 focus:border-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none placeholder:text-placeholder disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              !!errorMessage && 'border-2 border-error_primary',
              className
            )}
            ref={ref}
            {...props}
          />
          <div className='absolute right-3 transform text-sm text-quaternary flex items-center h-full'>
            {tag ? (<p>{tag}</p>) :
              (isPassword && (
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute right-3 transform text-sm text-[#2C6000] cursor-pointer'
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              ))
            }
          </div>
          {errorMessage && <p className='text-error_primary text-sm'>{errorMessage}</p>}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
