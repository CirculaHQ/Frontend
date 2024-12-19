import { ReactNode } from 'react';


interface FormSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => {
  return (
    <div className='mb-10 grid grid-cols-1 md:grid-cols-[300px_1fr] w-full md:max-w-[85%] gap-8'>
      {/* Section Header */}
      <div>
        <h3 className='text-sm text-secondary font-semibold'>{title}</h3>
        <p className='text-sm text-tertiary font-normal'>{description}</p>
      </div>

      {/* Section Content */}
      <div className='flex flex-col items-start gap-4 w-full'>{children}</div>
    </div>
  );
};

export { FormSection };
