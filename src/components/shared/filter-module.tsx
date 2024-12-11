import { cn } from '@/lib/utils';
import { Icon } from '../ui';
import { TextBadge } from './text-badge';

interface FilterModuleProps {
  containerClass?: string;
  includeRegion?: boolean;
}
const FilterModule = ({containerClass, includeRegion = true}: FilterModuleProps) => {
  return (
    <div className={cn("flex flex-row items-center justify-between py-2", containerClass && containerClass)}>
      <div className="flex flex-row items-center gap-2">
        <Icon name="search" className="text-quaternary w-5 h-5" fill="none" />
        <input
          type="text"
          className="border-none w-full pr-3 py-2 text-sm font-normal rounded-md focus:outline-none placeholder:font-normal font-inter max-w-[200px] placeholder:font-inter placeholder:text-placeholder"
          placeholder="Search"
        />
      </div>
      <div className="hidden md:flex flex-row items-center justify-end ">
        <TextBadge text='M'/>
        <div className="gap-2 flex flex-row items-center justify-center px-3">
          <span className='text-placeholder font-normal text-sm'>All types</span>
          <Icon name="chevron-down" className="w-5 h-5 text-quaternary" fill='none'/>
        </div>
       {includeRegion && <div className="gap-2 flex flex-row items-center justify-center px-3">
          <span className='text-placeholder font-normal text-sm'>All regions</span>
          <Icon name="chevron-down" className="w-5 h-5 text-quaternary" fill='none'/>
        </div>}
      </div>
    </div>
  );
};

export { FilterModule };
