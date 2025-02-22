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
import { useFetchOperation, useFetchOperationInventories } from '@/hooks/api/queries/operations/useOperationsQuery';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { OperationSummary, Operations } from './components';
import { useMemo } from 'react';

const OperationsDetails = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { operationId } = useParams()
  const currentTab = searchParams.get('tab') ?? 'Operation summary'

  const { data, isLoading } = useFetchOperation(operationId ?? '');
  const { data: inventories, isLoading: isLoadingInventories } = useFetchOperationInventories(operationId ?? '')

  const tabs = [
    { name: 'Operation summary' },
    { name: 'Operations' }
  ]

  const handleChangeTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const enhancedInventories = useMemo(() => {
    // Adds input quantity from the operations data to the respective inventory
    if (inventories?.length && data?.input_quantities?.length) {
      const updated = inventories.map((item, i) => {
        return { ...item, input_quantity: data?.input_quantities[i] }
      })
      return updated || []
    }
  }, [inventories, data])

  if (isLoading || isLoadingInventories) return <PageLoader />;
  if (!data) return <p>No data found!!!</p>

  return (
    <div>
      <BackButton route={appRoute.operations} label='Back to operations' />
      <div className='flex justify-between items-center mb-6'>
        <ModuleHeader title={data?.code}>
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
            <Button onClick={() => navigate(appRoute.editOperation(data.id))}>Edit details</Button>
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
      <Tabs defaultValue={currentTab} onValueChange={handleChangeTab}>
        <TabsList className='flex border-b mb-6 text-left justify-start'>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.name}
              value={tab.name}
              className={`
                px-4 py-2 border-b-2 font-medium ${currentTab === tab.name ? 'border-green-500 !text-green-600' : 'text-gray-500 hover:text-gray-700'}
                `}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={tabs[0].name}>
          <OperationSummary
            inventories={enhancedInventories}
            operation={data}
          />
        </TabsContent>
        <TabsContent value={tabs[1].name}>
          <Operations operationId={operationId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationsDetails;
