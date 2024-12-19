import { cn } from '@/lib/utils';
import React from 'react';

type ModuleHeaderProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
  description?: string;
};
const ModuleHeader = ({ title, children, className, description }: ModuleHeaderProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-center justify-between w-full',
        className
      )}
    >
      <div className='flex flex-col items-start'>
        <h1 className='text-2xl font-semibold text-primary'>{title}</h1>
        {description && <p className='text-tertiary font-normal text-base'>{description}</p>}
      </div>
      {children}
    </div>
  );
};

export { ModuleHeader };
