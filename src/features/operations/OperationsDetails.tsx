import { ModuleHeader, TextBadge } from '@/components/shared';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
} from '@/components/ui';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useNavigate } from 'react-router-dom';

const OperationsDetails = () => {
  const navigate = useNavigate();

  const vendorData = {
    'Inventory details': {
      'Inventory ID': 'ID-47890875',
      'Date received': '2 November, 1989',
      Material: 'Plastics',
      'Material type': 'Polyethylene Terephthalate (PET)',
      supportingText: 'Supporting text goes here',
    },
    'Specifications and details': {
      Quantity: '500kg',
      'Quantity produced': '500kg',
      'Quantity wasted': '90kg',
      supportingText: 'Supporting text goes here',
    },
  };

  const icons: { [key: string]: string } = {
    'Inventory ID': 'hash',
    'Date received': 'calendar',
    Material: 'tag-03',
    'Material type': 'tag-01',
    Quantity: 'scales',
    'Quantity produced': 'scales',
    'Quantity wasted': 'scales',
  };

  return (
    <div className='p-4'>
      <button
        onClick={() => navigate(appRoute.vendors)}
        className='text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-4'
      >
        <Icon name='arrow-left' className='w-5 h-5' /> Back to Customers
      </button>
      <div className='flex justify-between items-center mb-6'>
        <ModuleHeader title={vendorData['Inventory details']['Inventory ID']}>
          <div className='flex flex-row items-center gap-3'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                  <Icon name='horizontal-dots' className='w-4 h-4 text-quaternary' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='text-sm font-medium text-secondary rounded-[8px] px-1'
              >
                <DropdownMenuItem className='py-2 rounded-[8px]'>Action one</DropdownMenuItem>
                <DropdownMenuItem className='py-2 rounded-[8px]'>Action two</DropdownMenuItem>
                <DropdownMenuItem className='py-2 rounded-[8px]'>Action three</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>Edit details</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='secondary'>Generate report</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='text-sm font-medium text-secondary rounded-[8px] px-1'
              >
                <DropdownMenuItem className='py-2  rounded-[8px] justify-between'>
                  <Icon name='mail-01' className='w-4 h-4 text-quaternary' />
                  Email vendor <TextBadge text='E' />
                </DropdownMenuItem>
                <DropdownMenuItem className='py-2 rounded-[8px] justify-between'>
                  <Icon name='phone' className='w-4 h-4 text-quaternary' />
                  Call vendor <TextBadge text='C' />
                </DropdownMenuItem>
                <DropdownMenuItem className='py-2 rounded-[8px] justify-between'>
                  <Icon name='zap' className='w-4 h-4 text-quaternary' />
                  Other contact <TextBadge text='O' />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </ModuleHeader>
      </div>

      <Tabs defaultValue='operations_summary'>
        <TabsList className='flex border-b mb-6 text-left justify-start'>
          <TabsTrigger
            value='operations_summary'
            className='px-4 py-2 border-b-2 border-green-500 text-green-600 font-medium'
          >
            Operations summary
          </TabsTrigger>
          <TabsTrigger value='operations' className='px-4 py-2 text-gray-500 hover:text-gray-700'>
            Operations
          </TabsTrigger>
        </TabsList>
        <TabsContent value='operations_summary'>
          {Object.entries(vendorData).map(([sectionTitle, sectionData]) => (
            <div key={sectionTitle} className='mb-6 mt-6'>
              <h3 className='text-base font-bold text-secondary mb-2'>{sectionTitle}</h3>
              <p className='text-xs text-quaternary mb-4'>{sectionData.supportingText}</p>
              <div className='grid grid-cols-1 gap-4'>
                {Object.entries(sectionData)
                  .filter(([key]) => key !== 'supportingText')
                  .map(([key, value]) => (
                    <div key={key} className='flex flex-col sm:flex-row gap-3 sm:items-center'>
                      <Icon name={icons[key]} className='w-4 h-4 text-quaternary hidden sm:block' />
                      <div className='flex flex-col sm:flex-row sm:items-center w-full'>
                        <p className='text-xs text-quaternary w-full sm:w-48'>{key}</p>
                        <p className='text-sm font-medium text-secondary sm:flex-1'>{value}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value='operations'>{/* operations content goes here */}</TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationsDetails;
