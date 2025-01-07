import { ModuleHeader } from '@/components/shared';
import {
  Button,
  DateRangePicker,
  Icon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import { useIsMobile } from '@/hooks/use-mobile';
import { memo, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { InfoIcon } from 'lucide-react';

type MetricCardProps = {
  title: string;
  count: string;
  icon: string;
};

const MetricCard = memo(({ title, count, icon }: MetricCardProps) => {
  return (
    <div className='flex gap-4 w-full flex-row items-start justify-start  border border-[#D5D7DA] p-5 rounded-xl shadow-sm'>
      <div className='w-10 h-10 shadow-sm border border-[#E9EAEB] rounded-lg flex flex-row items-center justify-center'>
        <Icon name={icon} className='w-5 h-5 text-black' />
      </div>
      <div>
        <div className='flex flex-row items-center justify-start gap-1'>
          <h4 className='text-tertiary text-sm font-medium'>{title}</h4>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className='w-3 h-3' color='#717680' />
            </TooltipTrigger>
            <TooltipContent>
              Recovery rate is how much of the raw material was produced are processing
            </TooltipContent>
          </Tooltip>
        </div>
        <h1 className='text-primary font-semibold md:text-[30px] md:leading-[38px] mt-2'>
          {count}
        </h1>
      </div>
    </div>
  );
});

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;
const Reports = () => {
  const isMobile = useIsMobile();

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div className='mb-10'>
      <ModuleHeader title='Reports' className='flex-row'>
        <div className='flex flex-row items-center gap-3'>
          <Button variant='secondary'>
            <Icon name='arrow-up-right' className='w-5 h-5 text-white' fill='#fff' stroke='#fff' />
            Export report
          </Button>
        </div>
      </ModuleHeader>
      <div className='flex flex-row items-center w-full justify-between mt-8'>
        <DateRangePicker />
      </div>

      <div className='mt-8'>
        <h2 className='text-primary font-semibold text-lg'>Operations</h2>
        <div className='flex flex-col md:flex-row  items-center justify-between w-full gap-6 mt-6'>
          <MetricCard title='Total Recycled' count='289,476 tons' icon='recycle' />
          <MetricCard title='Recovery Rate' count='98%' icon='settings' />
          <MetricCard title='Number of materials' count='13' icon='alert-circle' />
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='text-primary font-semibold text-lg'>Environmental</h2>
        <div className='flex flex-col md:flex-row  items-center justify-between w-full gap-6 mt-6'>
          <MetricCard title='GHGeq Avoided' count='200,000 tons' icon='wind' />
          <MetricCard title='Number of operations' count='12,440 Joules' icon='lightning' />
          <MetricCard title='Waste yield' count='2,500yd3' icon='globe' />
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='text-primary font-semibold text-lg'>Social</h2>
        <div className='flex flex-col md:flex-row  items-center justify-between w-full gap-6 mt-6'>
          <MetricCard title='Direct Jobs Created' count='80' icon='contacts' />
          <MetricCard title='Indirect Jobs created' count='500' icon='contacts' />
        </div>
      </div>
      <div className='mt-8 flex flex-row items-center justify-between w-full'>
        <h3 className='text-primary font-semibold text-lg'>Traceability</h3>
        <Button className='text-secondary font-semibold text-sm '>
          Map visualization
          <Icon name='chevron-down' className='w-5 h-5 text-secondary' fill='#fff' stroke='#fff' />
        </Button>
      </div>

      <div className='mt-8 h-[50vh] w-full rounded-lg'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text='My Marker' />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Reports;
