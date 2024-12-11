import Logo from '@/assets/images/logo.png';
import { useIsMobile } from '@/hooks/use-mobile';
import { Icon, SidebarTrigger } from '../ui';

const Navbar = () => {
  const isMobile = useIsMobile();
  return (
    <div className='px-4 py-4 md:px-8 md:py-3 border-b border-b-[#D5D7DA] flex flex-row items-center justify-between w-full'>
      {isMobile ? (
        <img src={Logo} width={100} height={28} />
      ) : (
        <div className='flex flex-row items-center'>
          <Icon name='search' className='text-quaternary w-5 h-5' fill='none' />
          <input
            type='text'
            className='border-none w-full pl-2 py-2 text-sm rounded-md focus:outline-none font-inter  placeholder:font-inter placeholder:text-placeholder'
            placeholder='Search'
          />
          <div className='border border-[#E9EAEB] rounded-[4px] px-1 leading-5'>
            <span className='text-quaternary font-medium text-xs'>/</span>
          </div>
        </div>
      )}
      <div className='flex flex-row items-center'>
        <div className='hidden md:flex flex-row items-center justify-center gap-1 border border-[#D5D7DA] px-3 py-2 rounded-lg shadow-md'>
          <Icon name='message-circle' className='text-quaternary w-5 h-5' fill='none' />
          <span className='text-[#00000080] font-semibold text-sm ml-2'>Feedback</span>
        </div>
        <div className='w-5 h-5 cursor-pointer px-4 ml-2'>
          <Icon name='bell' className='text-quaternary w-5 h-5' fill='none' />
        </div>
        {isMobile && <SidebarTrigger className='ml-5' />}
      </div>
    </div>
  );
};

export default Navbar;
