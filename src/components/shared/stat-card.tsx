interface Props {
  label: string;
  value: string;
  containerClassName?: string;
  onClick?: (e: any) => void;
  isActive?: boolean;
}

export const StatCard = ({ label, value, onClick, isActive = false, containerClassName = '' }: Props) => {
  const handleCallback = () => {
    if (onClick) {
      onClick("j")
    }
  }

  return (
    <div className={`gap-2 flex flex-col relative ${containerClassName}`} onClick={handleCallback}>
      {isActive && <div className="w-full border-2 border-black absolute top-0 left-0" />}
      <h4 className='text-tertiary font-semibold text-sm'>{label}</h4>
      <h1 className='font-semibold text-primary text-3xl'>{value}</h1>
    </div>
  );
};
