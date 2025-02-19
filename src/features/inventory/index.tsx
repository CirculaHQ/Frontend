import { PageLoader } from '@/components/loaders';
import {
  EmptyState,
  FilterModule,
  LineDistribution,
  ModuleHeader,
  StatCard,
  TextBadge,
} from '@/components/shared';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DateRangePicker,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from '@/components/ui';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useTableFilters } from '@/hooks';
import { useDeleteInventory } from '@/hooks/api/mutations/inventory';
import { useFetchInventory, useFetchInventoryBreakdown } from '@/hooks/api/queries/inventory';
import { useIsMobile } from '@/hooks/use-mobile';
import { getMaterialColor } from '@/utils/materials';
import { capitalizeFirstLetter, generateRandomBackgroundColor, getInitials } from '@/utils/textFormatter';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const tabs = [
  { label: 'Raw materials', value: 'raw' },
  { label: 'Ready for sale', value: 'ready' },
  { label: 'Waste', value: 'waste' },
];
const summaryOptions = [
  { label: 'Total materials', value: '' },
  { label: 'Raw materials', value: 'raw' },
  { label: 'Ready for sale', value: 'ready' },
  //{ label: 'Waste', value: 'waste' },
]

const Inventory = () => {
  const { params, handleSearchChange, currentPage, setCurrentPage, onPageChange } = useTableFilters({})
  const [searchParams, setSearchParams] = useSearchParams();
  const [summary, setSummary] = useState(summaryOptions[0].label);
  const currentTab = searchParams.get('tab') ?? 'raw';
  const deleteInventory = useDeleteInventory();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data, isLoading } = useFetchInventory({ stage: currentTab });
  const { data: totalInventoryBreakdown, isLoading: loadingInventoryBreakdown } = useFetchInventoryBreakdown({});
  const { data: rawInventoryBreakdown, isLoading: loadingRawInventoryBreakdown } = useFetchInventoryBreakdown({ stage: 'raw' });
  const { data: readyInventoryBreakdown, isLoading: loadingReadyInventoryBreakdown } = useFetchInventoryBreakdown({ stage: 'ready' });

  const totalPages = data ? Math.ceil(data.count / params.limit) : 0;

  const inventoryBreakdown = useMemo(() => {
    if (summary === summaryOptions[2].label) return readyInventoryBreakdown
    if (summary === summaryOptions[1].label) return rawInventoryBreakdown
    return totalInventoryBreakdown
  }, [summary, readyInventoryBreakdown, rawInventoryBreakdown, totalInventoryBreakdown])

  const handleDeleteInventory = async (e: any, id: string) => {
    e.stopPropagation();
    await deleteInventory.mutateAsync(
      { id },
      {
        onSuccess: () => {
          setCurrentPage(1); // Reset to first page after deletion
        },
      }
    );
  };

  const handleChangeTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const navigateToEditMaterial = (e: any, material: any) => {
    e.stopPropagation();
    navigate(appRoute.add_inventory, {
      state: { type: material.type, inventoryData: { ...material, id: material.id } },
    });
  };

  const navigateToInventory = (e: any, id: any) => {
    e.stopPropagation();
    navigate(`${appRoute.inventory}/${id}`)
  };

  const exportMaterial = (e: any, material: any) => {
    e.stopPropagation();
  };

  const lineDistributionSegments = inventoryBreakdown
    ? Object.entries(inventoryBreakdown.materials).map(([material, quantity]) => ({
      // color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      color: getMaterialColor(material),
      weight: quantity,
      label: capitalizeFirstLetter(material),
      value: `${quantity} kg`,
      percentage: `${((quantity / inventoryBreakdown.total_quantity) * 100).toFixed(1)}%`,
      subSegments: inventoryBreakdown.material_types[material]
        ? Object.entries(inventoryBreakdown.material_types[material]).map(
          ([type, subQuantity]) => ({
            name: type,
            amount: subQuantity,
          })
        )
        : [],
    }))
    : [];

  if (isLoading || loadingInventoryBreakdown || loadingRawInventoryBreakdown || loadingReadyInventoryBreakdown) return <PageLoader />;

  return (
    <div className='mb-10'>
      <ModuleHeader title='Inventory'>
        <div className='flex flex-row items-center gap-3'>
          {!isMobile && (
            <div className='flex flex-row items-center w-full justify-start gap-5'>
              <DateRangePicker showRange={true} />
              <div className='flex flex-row items-center gap-1'>
                <span className='text-tertiary font-semibold text-sm'>All material</span>
                <Icon name='chevron-down' className='w-5 h-5 text-tertiary' />
              </div>
            </div>
          )}
          <Button>Export</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>Update inventory</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='text-sm font-medium text-secondary rounded-[8px] px-1'
            >
              <DropdownMenuItem
                className='py-2  rounded-[8px] justify-between'
                onClick={() => {
                  navigate(appRoute.add_inventory, { state: { type: 'in' } });
                }}
              >
                Inventory in <TextBadge text='I' />
              </DropdownMenuItem>
              <DropdownMenuItem
                className='py-2 rounded-[8px] justify-between'
                onClick={() => {
                  navigate(appRoute.add_inventory, { state: { type: 'out' } });
                }}
              >
                Inventory out <TextBadge text='0' />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {isMobile && (
          <div className='flex flex-row items-center w-full justify-start gap-5 mt-4'>
            <DateRangePicker showRange={true} />
            <div className='flex flex-row items-center gap-1'>
              <span className='text-tertiary font-semibold text-sm'>All material</span>
              <Icon name='chevron-down' className='w-5 h-5 text-tertiary' />
            </div>
          </div>
        )}
      </ModuleHeader>
      {!isMobile ? (
        <div className='my-8 border-t border-border'>
          <div className='grid grid-cols-3'>
            <StatCard
              containerClassName='pt-6 cursor-pointer'
              label='Total material (kg)'
              value={totalInventoryBreakdown?.total_quantity?.toLocaleString()}
              onClick={() => setSummary(summaryOptions[0].label)}
              isActive={summary === summaryOptions[0].label}
            />
            <StatCard
              containerClassName='pt-6 px-6 border-x border-x-border cursor-pointer'
              label='Raw material (kg)'
              value={rawInventoryBreakdown?.total_quantity?.toLocaleString()}
              onClick={() => setSummary(summaryOptions[1].label)}
              isActive={summary === summaryOptions[1].label}
            />
            <StatCard
              containerClassName='pt-6 px-6 cursor-pointer'
              label='Ready for sale (kg)'
              value={readyInventoryBreakdown?.total_quantity?.toLocaleString()}
              onClick={() => setSummary(summaryOptions[2].label)}
              isActive={summary === summaryOptions[2].label}
            />
          </div>
          {!!lineDistributionSegments?.length && (
            <div className='mt-4'>
              <span className='text-sm font-normal text-tertiary'>Material distribution</span>
              <LineDistribution segments={lineDistributionSegments} height={8} className='mt-4' />
            </div>
          )}
        </div>
      ) : (
        <div className='my-8'>
          <div className='flex justify-between'>
            <StatCard label={`${summary} (kg)`} value='292,400.00' />
            <Select
              //value={summary}
              onValueChange={(value) => setSummary(value)}
            >
              <SelectTrigger className='w-[110px] h-[36px]'>
                <SelectValue placeholder='Summary' className='text-placeholder font-normal' />
              </SelectTrigger>
              <SelectContent>
                {summaryOptions.map((option) => (
                  <SelectItem value={option.label}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='mt-4'>
            <span className='text-sm font-normal text-tertiary'>Material distribution</span>
            <LineDistribution segments={lineDistributionSegments} height={8} className='mt-4' />
          </div>
        </div>
      )}
      <Tabs defaultValue={currentTab} onValueChange={handleChangeTab} className='overflow-x-auto'>
        <TabsList className='flex border-b text-left justify-start space-x-2'>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`px-1 py-2 rounded-none ${currentTab === tab.value ? 'active-tab' : 'inactive-tab'}`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* <TabsContent value='profile'>
        </TabsContent>
        <TabsContent value='activity'>
        </TabsContent> */}
      </Tabs>
      <FilterModule includeRegion={false} onSearchChange={handleSearchChange} />
      <div>
        {data?.results.length === 0 ? (
          <EmptyState
            icon='inventory-empty'
            title='No items in your inventory'
            description='Add or remove items from your inventory and they will show up here.'
            className='mt-8'
          />
        ) : !isMobile ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead className='w-[100px]'>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Quantity </TableHead>
                <TableHead>Date received</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.results.map((item) => (
                <TableRow
                  className='cursor-pointer'
                  key={item.id}
                  onClick={(e) => navigateToInventory(e, item.id)}
                >
                  <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>
                        {capitalizeFirstLetter(item.material)}
                      </span>
                      <h4 className='font-normal text-sm text-tertiary'>
                        {capitalizeFirstLetter(item.material_type)}
                      </h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px]'>
                    <div className='flex flex-row items-center gap-3 justify-start'>
                      <Avatar className='w-8 h-8 rounded-full'>
                        <AvatarImage src={item?.vendor?.photo} />
                        <AvatarFallback
                          style={{ backgroundColor: generateRandomBackgroundColor() }}
                          className='w-8 h-8 rounded-full text-white'
                        >
                          <Icon name='avatar' className='w-8 h-8' />
                        </AvatarFallback>
                      </Avatar>
                      <span className='font-medium text-sm text-primary capitalize'>
                        {item?.vendor?.business_name || (item?.vendor?.first_name ? `${item?.vendor?.first_name} ${item?.vendor?.last_name}` : 'N/A')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    {item.currency} {Number(item.amount)?.toLocaleString()}
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    {Number(item.quantity)?.toLocaleString()} kg
                  </TableCell>
                  <TableCell className='w-[200px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>
                        {new Date(item.date_received).toLocaleDateString()}
                      </span>
                      {/* <h4 className='font-normal text-sm text-tertiary'>13/07/2020</h4> */}
                    </div>
                  </TableCell>

                  <TableCell className='w-7'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className='w-4 h-4'>
                          <Icon name='horizontal-dots' className='w-4 h-4 text-quaternary' />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align='end'
                        className='text-sm font-medium text-secondary rounded-[8px] px-1'
                      >
                        <DropdownMenuItem
                          className='py-2  rounded-[8px]'
                          onClick={(e) => navigateToEditMaterial(e, item)}
                        >
                          <Icon name='edit' className='w-4 h-4 text-quaternary' />
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='py-2 rounded-[8px]'
                          onClick={(e) => exportMaterial(e, item)}
                        >
                          <Icon name='arrow-up-right' className='w-4 h-4 text-quaternary' /> Export
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='py-2 rounded-[8px]'
                          onClick={(e) => handleDeleteInventory(e, item.id)}
                        >
                          <Icon name='trash' className='w-4 h-4 text-quaternary' />
                          Delete operation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.results.map((item) => (
                <TableRow className='cursor-pointer' key={item.id} onClick={(e) => navigateToInventory(e, item.id)}>
                  <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>{item.material}</span>
                      <h4 className='font-normal text-sm text-tertiary'>{item.material_type}</h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[200px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>{item.quantity} kg</span>
                      <h4 className='font-normal text-sm text-tertiary'>
                        {item.currency} {item.amount}
                      </h4>
                    </div>
                  </TableCell>

                  <TableCell className='w-7'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className='w-4 h-4'>
                          <Icon name='horizontal-dots' className='w-4 h-4 text-quaternary' />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align='end'
                        className='text-sm font-medium text-secondary rounded-[8px] px-1'
                      >
                        <DropdownMenuItem
                          className='py-2  rounded-[8px]'
                          onClick={(e) => navigateToEditMaterial(e, item)}
                        >
                          <Icon name='edit' className='w-4 h-4 text-quaternary' />
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='py-2 rounded-[8px]'
                          onClick={(e) => exportMaterial(e, item)}
                        >
                          <Icon name='arrow-up-right' className='w-4 h-4 text-quaternary' /> Export
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='py-2 rounded-[8px]'
                          onClick={(e) => handleDeleteInventory(e, item.id)}
                        >
                          <Icon name='trash' className='w-4 h-4 text-quaternary' />
                          Delete operation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {data?.results.length !== 0 && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            totalReports={data?.count || 0}
            reportsPerPage={params.limit}
          />
        )}
      </div>
    </div>
  );
};

export default Inventory;
