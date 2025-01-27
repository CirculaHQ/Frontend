interface Props {
  label: string;
  value: string;
  containerClassName?: string;
}

export const StatCard = ({ label, value, containerClassName = '' }: Props) => {
  return (
    <div className={`gap-2 flex flex-col ${containerClassName}`}>
      <h4 className='text-tertiary font-semibold text-sm'>{label}</h4>
      <h1 className='font-semibold text-primary text-3xl'>{value}</h1>
    </div>
  );
};
