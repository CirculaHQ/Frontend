import { cn } from '@/lib/utils';
import React from 'react';

type ModuleHeaderProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
};
const ModuleHeader = ({ title, children, className }: ModuleHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-center justify-between w-full", className)}>
      <h1 className="text-2xl font-semibold text-primary">{title}</h1>
      {children}
    </div>
  );
};

export { ModuleHeader };
