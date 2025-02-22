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
import { materials } from '@/config/materials';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useDeleteInventory } from '@/hooks/api/mutations/inventory';
import { useFetchInventoryBreakdown } from '@/hooks/api/mutations/inventory/useFetchInventoryBreakdown';
import { useFetchInventory } from '@/hooks/api/queries/inventory';
import { useIsMobile } from '@/hooks/use-mobile';
import { capitalizeFirstLetter } from '@/utils/textFormatter';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const INVENTORY_IN = 'inventory-in';
const INVENTORY_OUT = 'inventory-out';
const PROCESSED_MATERIALS = 'processed-materials';
const RAW_MATERIALS = 'raw-materials';
const TOTAL_MATERIALS = 'Total materials';

const tabs = [
  { label: 'Inventory in', value: 'inventory-in' },
  { label: 'Inventory out', value: 'inventory-out' },
  { label: 'Raw materials', value: 'raw-materials' },
  { label: 'Processed materials', value: 'processed-materials' },
];

const Inventory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [summary, setSummary] = useState(TOTAL_MATERIALS);
  const currentTab = searchParams.get('tab') ?? INVENTORY_IN;
  const deleteInventory = useDeleteInventory();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 20;
  const [searchQuery, setSearchQuery] = useState('');

  const getType = (tab: string) => {
    switch (tab) {
      case INVENTORY_IN:
        return 'in';
      case INVENTORY_OUT:
        return 'out';
      case PROCESSED_MATERIALS:
        return 'processed';
      case RAW_MATERIALS:
        return 'raw';
    }
  };

  const queryParams = {
    limit: reportsPerPage,
    offset: (currentPage - 1) * reportsPerPage,
    search: searchQuery,
    type: getType(currentTab),
  };

  const { data, isLoading } = useFetchInventory(queryParams);

  const totalPages = data ? Math.ceil(data.count / reportsPerPage) : 0;

  const handleSearchChange = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
    setCurrentPage(1); // Reset to first page when searching
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  const exportMaterial = (e: any, material: any) => {
    e.stopPropagation();
  };

  const { data: inventoryBreakdown, isLoading: loadingInventoryBreakdown } =
    useFetchInventoryBreakdown();

  if (loadingInventoryBreakdown) {
    return <div>Loading material distribution...</div>;
  }

  const getMaterialColor = (material: string) => {
    return materials.find((item: any) => item.name === material)?.backgroundColor ?? '';
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

  if (isLoading) return <div>Loading...</div>;

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
            <StatCard containerClassName='pt-6' label='Total material (kg)' value='292,400.00' />
            <StatCard
              containerClassName='pt-6 px-6 border-x border-x-border'
              label='Raw material (kg)'
              value='292,400.00'
            />
            <StatCard
              containerClassName='pt-6 px-6'
              label='Processed material (kg)'
              value='292,400.00'
            />
          </div>
          <div className='mt-4'>
            <span className='text-sm font-normal text-tertiary'>Material distribution</span>
            <LineDistribution segments={lineDistributionSegments} height={8} className='mt-4' />
          </div>
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
                <SelectItem value='Total material'>Total material</SelectItem>
                <SelectItem value='Raw material'>Raw material</SelectItem>
                <SelectItem value='Processed material'>Processed material</SelectItem>
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
              className={`px-1 py-2 rounded-none
                ${
                  currentTab === tab.value
                    ? 'border-b-2 border-green-500 !text-green-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }
                  `}
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
                  onClick={() => navigate(`${appRoute.inventory}/${item.id}`)}
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
                      <Avatar className='w-6 h-6 rounded-full'>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className='text-sm text-tertiary'>{item.vendor.account_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    {item.currency} {item.amount}
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    {item.quantity} kg
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
                <TableRow className='cursor-pointer' key={item.id}>
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
            reportsPerPage={reportsPerPage}
          />
        )}
      </div>
    </div>
  );
};

export default Inventory;
