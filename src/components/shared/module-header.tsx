import React from 'react';

type ModuleHeaderProps = {
  title: string;
  children?: React.ReactNode;
};
const ModuleHeader = ({ title, children }: ModuleHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between w-full">
      <h1 className="text-2xl font-semibold text-primary">{title}</h1>
      {children}
    </div>
  );
};

export { ModuleHeader };