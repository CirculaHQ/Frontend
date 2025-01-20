import { EmptyState, FilterModule, LineDistribution, ModuleHeader } from '@/components/shared';
import {
  Badge,
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
import { useFetchInventoryBreakdown } from '@/hooks/api/mutations/inventory/useFetchInventoryBreakdown';
import { useFetchOperations } from '@/hooks/api/queries/operations/useFetchOperations';
import { useIsMobile } from '@/hooks/use-mobile';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MetricCardProps = {
  title: string;
  count: string;
};

const MetricCard = memo(({ title, count }: MetricCardProps) => {
  return (
    <div className='h-[106px] flex gap-2 w-full flex-col items-start justify-center  border border-[#D5D7DA] px-5 rounded-xl shadow-sm'>
      <h4 className='text-tertiary text-sm font-medium'>{title}</h4>
      <h1 className='text-primary font-semibold md:text-[30px] md:leading-[38px]'>{count}</h1>
    </div>
  );
});

const Operations = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 20;
  const totalPages = Math.ceil(100 / reportsPerPage);
  const [searchQuery, setSearchQuery] = useState('');

  const queryParams = {
    limit: reportsPerPage,
    offset: (currentPage - 1) * reportsPerPage,
    search: searchQuery,
  };

  const { data, isLoading } = useFetchOperations(queryParams);

  const handleSearchChange = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
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

  if (isLoading) return <div>Loading Operations...</div>;
  return (
    <div>
      <ModuleHeader title='Operations'>
        <div className='flex flex-row items-center gap-3'>
          <Button>
            <Icon name='arrow-up-right' className='w-5 h-5 text-secondary' />
            Export report
          </Button>
          <Button variant='secondary' onClick={() => navigate(appRoute.add_operation)}>
            <Icon name='plus' className='w-5 h-5 text-[#FAFAFA]' />
            New operation
          </Button>
        </div>
      </ModuleHeader>
      <div className='flex flex-row items-center w-full justify-between mt-8'>
        <Button>
          <Icon name='filter' className='w-5 h-5 text-secondary' />
          Filter
        </Button>
        <DateRangePicker />
      </div>

      <div className='flex flex-col md:flex-row  items-center justify-between w-full mt-8 gap-6'>
        <MetricCard title='Quantity' count='200,000kg' />
        <MetricCard title='Number of operations' count='12,440' />
        <MetricCard title='Waste yield' count='96,345kg' />
      </div>
      <div className='mt-4'>
        <span className='text-sm font-normal text-tertiary'>Material distribution</span>
        <LineDistribution segments={lineDistributionSegments} height={8} className='mt-4' />
      </div>
      <FilterModule
        containerClass='mt-8'
        includeRegion={false}
        onSearchChange={handleSearchChange}
      />

      <div className='mt-2'>
        {data?.results.length === 0 ? (
          <EmptyState
            icon='inventory-empty'
            title='No operations started'
            description='Begin your operations on Circula and they would show up here.'
            className='mt-8'
          />
        ) : !isMobile ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Quantity produced</TableHead>
                <TableHead>Waste produced</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.results.map((item) => (
                <TableRow className='cursor-pointer' key={item.id}>
                  <TableCell className='w-[100px]'>{item.id}</TableCell>
                  <TableCell className='w-[200px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>{item.start_time}</span>
                      <h4 className='font-normal text-sm text-tertiary'>{item.start_date}</h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>Clear Glass</span>
                      <h4 className='font-normal text-sm text-tertiary'>Glass</h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    {item.operation_type}
                  </TableCell>

                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    <Badge variant='failed'>Completed</Badge>
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    {item.quantity_produced}
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    {item.waste_produced}
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
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.results.map((item) => (
                <TableRow className='cursor-pointer' key={item.id}>
                  <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>Clear Glass</span>
                      <h4 className='font-normal text-sm text-tertiary'>Glass</h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    {item.operation_type}
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
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalReports={100}
          reportsPerPage={reportsPerPage}
        />
      </div>
    </div>
  );
};

export default Operations;
