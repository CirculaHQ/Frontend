import { ModuleHeader } from '@/components/shared';
import { Inventory, Operations, RecentActivities, Sales } from './components';

const Dashboard = () => {
  return (
    <div className='mb-10'>
      <ModuleHeader title='Dashboard' />
      <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-10 mt-8'>
        <Operations />
        <Inventory />
      </div>
      <Sales />
      <RecentActivities isPaginated={false} containerClassName='mt-10' />
    </div>
  );
};

export default Dashboard;
