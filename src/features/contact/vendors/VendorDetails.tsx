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

const VendorDetails = () => {
  const navigate = useNavigate();

  const vendorData = {
    'Business information': {
      'Business name': 'Squash Inc.',
      'Phone number': '+2348012345678',
      'Email address': 'hi@squash.co',
      'Role in value chain': 'Distributor',
      supportingText: 'Supporting text goes here',
    },
    'Business address': {
      Country: 'Nigeria',
      Address: '421 Berrylane Street',
      'L.G.A.': 'Lagos',
      State: 'Lagos',
      supportingText: 'Supporting text goes here',
    },
    'Bank details': {
      'Bank name': 'Access Bank',
      'Account number': '0123456789',
      'Account name': 'Squash Inc.',
      'Additional notes': 'SWIFT code: 1234',
      supportingText: 'Supporting text goes here',
    },
  };

  const icons: { [key: string]: string } = {
    'Business name': 'building',
    'Phone number': 'phone',
    'Email address': 'mail-01',
    'Role in value chain': 'users-01',
    Country: 'flag-01',
    Address: 'marker-pin',
    'L.G.A.': 'mark',
    State: 'mark',
    'Bank name': 'bank',
    'Account number': 'hash',
    'Account name': 'user-circle',
    'Additional notes': 'sticker-circle',
  };

  return (
    <div className='p-4'>
      <button
        onClick={() => navigate(appRoute.vendors)}
        className='text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-4'
      >
        <Icon name='arrow-left' className='w-5 h-5' /> Back to Vendors
      </button>
      <div className='flex justify-between items-center mb-6'>
        <div className='bg-white p-[3px] rounded-2xl shadow-md mr-4'>
          <div className='bg-[#F5F5F5] rounded-2xl w-[72px] h-[72px] border border-[#D5D7DA] flex flex-col items-center justify-center'>
            <Icon name='persona' className='w-9 h-9' />
          </div>
        </div>
        <ModuleHeader title={vendorData['Business information']['Business name']}>
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
            <Button>Secondary</Button>
            <Button>Edit details</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='secondary'>Contact</Button>
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

      <Tabs defaultValue='profile'>
        <TabsList className='flex border-b mb-6 text-left justify-start'>
          <TabsTrigger
            value='profile'
            className='px-4 py-2 border-b-2 border-green-500 text-green-600 font-medium'
          >
            Profile details
          </TabsTrigger>
          <TabsTrigger value='activity' className='px-4 py-2 text-gray-500 hover:text-gray-700'>
            Activity
          </TabsTrigger>
        </TabsList>
        <TabsContent value='profile'>
          {/* Profile details content goes here */}
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
        <TabsContent value='activity'>{/* Activity content goes here */}</TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorDetails;
