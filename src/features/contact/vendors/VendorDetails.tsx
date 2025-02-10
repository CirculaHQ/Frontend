import { BackButton, ModuleHeader, TextBadge } from '@/components/shared';
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
import { useFetchVendor } from '@/hooks/api/queries/contacts';
import { BUSINESS } from '@/types';
import { capitalizeFirstLetterOfEachWord } from '@/utils/textFormatter';
import { useNavigate, useParams } from 'react-router-dom';

const VendorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchVendor(id);
  const isBusiness = data?.type === BUSINESS;

  if (isLoading) return <p>Fetching vendor details...</p>;
  if (!data) return <p>No vendor data found</p>;

  const name = isBusiness ? data?.account_name : `${data?.first_name} ${data?.last_name}`;

  const vendorData = {
    'Business information': {
      'Business name': capitalizeFirstLetterOfEachWord(name),
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
      <BackButton route={appRoute.vendors} label='Back to Vendors' />
      <div className='flex justify-between items-center mb-6'>
        <div className='mr-4'>
          <div className='bg-[#F5F5F5] rounded-full w-[56px] h-[56px] border flex flex-col items-center justify-center'>
            {!data.photo ? (
              <Icon name='persona' className='w-9 h-9 rounded-full' />
            ) : (
              <img
                src={data.photo}
                width={56}
                height={56}
                alt='pics'
                className='object-cover rounded-full'
              />
            )}
          </div>
        </div>
        <ModuleHeader
          title={vendorData['Business information']['Business name']}
          description={data?.email}
        >
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
            <Button
              type='button'
              onClick={() => navigate(`${appRoute.add_vendor}?type=${data.type}&id=${data.id}`)}
            >
              Edit details
            </Button>
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
