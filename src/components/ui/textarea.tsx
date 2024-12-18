import * as React from 'react';

import { cn } from '@/lib/utils';

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label,errorMessage,  ...props }, ref) => {
    return (
      <div className='flex flex-col gap-1.5 relative w-full'>
        {label && <label className='text-sm font-medium text-secondary'>{label}</label>}
        <textarea
          className={cn(
            'flex min-h-[80px] w-full shadow-sm rounded-md border border-[#D5D7DA] bg-background px-3 py-2 text-base ring-offset-background focus:outline-none placeholder:text-muted-foreground focus:border-2 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && <p className='text-error_primary text-sm'>{errorMessage}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
