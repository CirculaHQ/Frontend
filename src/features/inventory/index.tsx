import {
  EmptyState,
  FilterModule,
  LineDistribution,
  ModuleHeader,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from '@/components/ui';
import { appRoute } from '@/config/routeMgt/routePaths';
import { deleteInventory } from '@/hooks/api/mutations/inventory/deleteInventory';
import { useFetchInventory } from '@/hooks/api/mutations/inventory/useFetchInventory';
import { useFetchInventoryBreakdown } from '@/hooks/api/mutations/inventory/useFetchInventoryBreakdown';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Inventory = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 20;
  const [searchQuery, setSearchQuery] = useState('');

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const { data, loading, error, setQueryParams } = useFetchInventory({
    limit: reportsPerPage,
    offset: (currentPage - 1) * reportsPerPage,
  });

  const totalPages = data ? Math.ceil(data.count / reportsPerPage) : 0;

  const handleSearchChange = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      search: searchQuery,
      offset: 0,
    }));
  }, [searchQuery, setQueryParams]);
  
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setQueryParams((prev) => ({ ...prev, offset: (page - 1) * reportsPerPage }));
  };

  const handleDeleteInventory = async (id: string) => {
    try {
      await deleteInventory(id);
      setQueryParams((prev) => ({ ...prev }));
    } catch (error) {
      console.error('Failed to delete inventory:', error);
    }
  };

  const { data: inventoryBreakdown, isLoading: loadingInventoryBreakdown } =
    useFetchInventoryBreakdown();

  if (loadingInventoryBreakdown) {
    return <div>Loading material distribution...</div>;
  }

  const lineDistributionSegments = inventoryBreakdown
    ? Object.entries(inventoryBreakdown.materials).map(([material, quantity]) => ({
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        weight: quantity,
        label: material,
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className='mb-10'>
      <ModuleHeader title='Inventory'>
        <div className='flex flex-row items-center gap-3'>
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
      </ModuleHeader>
      <div className='flex flex-row items-center w-full justify-start gap-5 mt-8'>
        <DateRangePicker />
        <div className='flex flex-row items-center gap-1'>
          <span className='text-tertiary font-semibold text-sm'>All material</span>
          <Icon name='chevron-down' className='w-5 h-5 text-tertiary' />
        </div>
      </div>
      <div className='mt-8'>
        <div className='gap-2 flex flex-col'>
          <h4 className='text-tertiary font-semibold text-sm'>Total Material (kilogram)</h4>
          <h1 className='font-semibold text-primary text-3xl'>292,400.00</h1>
        </div>
        <div className='mt-4'>
          <span className='text-sm font-normal text-tertiary'>Material distribution</span>
          <LineDistribution segments={lineDistributionSegments} height={8} className='mt-4' />
        </div>
      </div>

      <FilterModule containerClass='mt-8' includeRegion={false} onSearchChange={handleSearchChange} />

      <div className='mt-2'>
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
                <TableRow className='cursor-pointer' key={item.id}>
                  <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>{capitalizeFirstLetter(item.material)}</span>
                      <h4 className='font-normal text-sm text-tertiary'>{capitalizeFirstLetter(item.material_type)}</h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px]'>
                    <div className='flex flex-row items-center gap-3 justify-start'>
                      <Avatar className='w-6 h-6 rounded-full'>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className='text-sm text-tertiary'>{item.vendor}</span>
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
                          onClick={() => {
                            navigate(appRoute.add_inventory, {
                              state: { type: item.type, inventoryData: { ...item, id: item.id } },
                            });
                          }}
                        >
                          <Icon name='edit' className='w-4 h-4 text-quaternary' />
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>
                          <Icon name='arrow-up-right' className='w-4 h-4 text-quaternary' /> Export
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='py-2 rounded-[8px]'
                          onClick={() => handleDeleteInventory(item.id)}
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
                        <DropdownMenuItem className='py-2  rounded-[8px]'>
                          <Icon name='edit' className='w-4 h-4 text-quaternary' />
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>
                          <Icon name='arrow-up-right' className='w-4 h-4 text-quaternary' /> Export
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>
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
