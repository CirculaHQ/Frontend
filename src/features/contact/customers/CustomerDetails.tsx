import { PageLoader } from '@/components/loaders';
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
import { useFetchCustomer, useFetchCustomerActivity } from '@/hooks/api/queries/contacts';
import { BUSINESS } from '@/types';
import { getRelativeTime } from '@/utils/dateFormatter';
import { getRoleInValueChain } from '@/utils/objectFormatter';
import { capitalizeFirstLetterOfEachWord } from '@/utils/textFormatter';
import { format } from 'date-fns';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const tabs = [
  { label: 'Profile details', value: 'profile' },
  { label: 'Activity', value: 'activity' },
];

const CustomerDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get('tab') ?? tabs[0].value
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchCustomer(id);
  const { data: activities, isLoading: isLoadingActivity } = useFetchCustomerActivity(id)
  const isBusiness = data?.type === BUSINESS;

  if (isLoading) return <PageLoader />;
  if (!data) return <p>No customer data found</p>;

  const name = isBusiness ? data?.business_name : `${data?.first_name} ${data?.last_name}`;

  const customerDataForBusiness = {
    'Business information': {
      'Business name': capitalizeFirstLetterOfEachWord(name),
      'Phone number': data?.phone_number || 'N/A',
      'Email address': data?.email || 'N/A',
      'Role in value chain': getRoleInValueChain(data?.role_in_value_chain) ?? 'N/A',
      supportingText: 'Supporting text goes here',
    },
    'Business address': {
      Country: capitalizeFirstLetterOfEachWord(data?.country) || 'N/A',
      Address: data?.address || 'N/A',
      District: capitalizeFirstLetterOfEachWord(data?.lga) || 'N/A',
      Region: capitalizeFirstLetterOfEachWord(data?.state) || 'N/A',
      supportingText: 'Supporting text goes here',
    }
  };

  const customerDataForIndividual = {
    'Personal information': {
      Name: capitalizeFirstLetterOfEachWord(name),
      Nickname: data?.nickname || 'N/A',
      'Date of Birth': data?.date_of_birth ? format(data?.date_of_birth, "PP") : 'N/A',
      'Phone number': data.phone_number || 'N/A',
      'Email address': data.email || 'N/A',
      'Role in value chain': getRoleInValueChain(data?.role_in_value_chain) ?? 'N/A',
      supportingText: 'Supporting text goes here',
    },
    'Personal address': {
      Country: capitalizeFirstLetterOfEachWord(data.country || 'N/A'),
      Address: capitalizeFirstLetterOfEachWord(data.address || 'N/A'),
      District: capitalizeFirstLetterOfEachWord(data.lga || 'N/A'),
      Region: capitalizeFirstLetterOfEachWord(data.state || 'N/A'),
      supportingText: 'Supporting text goes here',
    },
  };

  const customerData = {
    ...(isBusiness ? customerDataForBusiness : customerDataForIndividual),
    'Bank details': {
      'Bank name': capitalizeFirstLetterOfEachWord(data?.bank_name) || 'N/A',
      'Account number': data?.account_number || 'N/A',
      'Account name': capitalizeFirstLetterOfEachWord(data?.account_name) || 'N/A',
      'Additional notes': data?.notes || 'N/A',
      supportingText: 'Supporting text goes here',
    },
  }

  const icons: { [key: string]: string } = {
    Name: 'user-03',
    Nickname: 'face-smile',
    'Date of Birth': 'calendar',
    'Business name': 'building',
    'Phone number': 'phone',
    'Email address': 'mail-01',
    'Role in value chain': 'users-01',
    Country: 'flag-01',
    Address: 'marker-pin',
    District: 'mark',
    Region: 'mark',
    'Bank name': 'bank',
    'Account number': 'hash',
    'Account name': 'user-circle',
    'Additional notes': 'sticker-circle',
  };

  const title = isBusiness ? customerDataForBusiness['Business information']['Business name'] : customerDataForIndividual['Personal information']['Name']

  return (
    <div>
      <BackButton route={appRoute.customers} label='Back to customers' />
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
        <ModuleHeader title={title}>
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
            <Button
              type='button'
              onClick={() => navigate(`${appRoute.editCustomer(data.id, data?.type)}`)}
            >
              Edit details
            </Button>
            <Button>Contact</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='secondary'>Send invoice</Button>
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

      <Tabs defaultValue={currentTab} onValueChange={(tab) => setSearchParams({ tab })}>
        <TabsList className='flex border-b mb-6 text-left justify-start'>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`px-4 py-2 border-b-2 ${currentTab === tab.value ? 'active-tab' : 'inactive-tab'} font-medium`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={tabs[0].value}>
          {/* Profile details content goes here */}
          {Object.entries(customerData).map(([sectionTitle, sectionData]) => (
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
                        <p className='text-sm text-quaternary w-full sm:w-48'>{key}</p>
                        <p className='text-sm font-medium text-secondary sm:flex-1'>{value}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value={tabs[1].value}>
          {/* Activity content goes here */}
          {isLoadingActivity ?
            <PageLoader /> : (
              <div className='space-y-8'>
                {activities?.results?.map((activity) => (
                  <div key={activity.id} className='flex space-x-3'>
                    <div className='shrink-0 w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center border'>
                      <Icon name='package-plus' className='w-5 h-5' />
                    </div>
                    {activity?.invoice && (
                      <div>
                        <p className='text-sm text-secondary font-medium'>
                          New invoice created <span className='text-xs text-tertiary font-normal'>{getRelativeTime(activity?.invoice?.created_at)}</span>
                        </p>
                        <p className='text-sm text-tertiary'>
                          {activity?.invoice?.currency}{activity?.invoice?.total} of (<span className='text-brand'>Ref {activity?.invoice?.code}</span>) created.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDetails;
