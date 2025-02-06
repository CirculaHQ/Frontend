import { EmptyState, FilterModule, LineDistribution, ModuleHeader, StatCard } from '@/components/shared';
import {
  Badge,
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
import { appRoute } from '@/config/routeMgt/routePaths';
import { useFetchInventoryBreakdown } from '@/hooks/api/mutations/inventory/useFetchInventoryBreakdown';
import { useFetchOperations } from '@/hooks/api/queries/operations/useFetchOperations';
import { useIsMobile } from '@/hooks/use-mobile';
import { getMaterialColor } from '@/utils/materials';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PRODUCED = 'Produced';

const Operations = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 20;
  const totalPages = Math.ceil(100 / reportsPerPage);
  const [searchQuery, setSearchQuery] = useState('');
  const [summary, setSummary] = useState(PRODUCED);

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
      color: getMaterialColor(material),
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
          {!isMobile && (
            <div className='flex flex-row items-center w-full justify-start gap-5'>
              <DateRangePicker showRange={true} />
              <div className='flex flex-row items-center gap-1'>
                <span className='text-tertiary font-semibold text-sm'>All material</span>
                <Icon name='chevron-down' className='w-5 h-5 text-tertiary' />
              </div>
            </div>
          )}
          <Button>
            Export report
          </Button>
          <Button variant='secondary' onClick={() => navigate(appRoute.add_operation)}>
            New operation
          </Button>
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
            <StatCard containerClassName='pt-6' label='Produced (Kilogram)' value='0' />
            <StatCard
              containerClassName='pt-6 px-6 border-x border-x-border'
              label='Waste yield (Kilogram)'
              value='0'
            />
            <StatCard
              containerClassName='pt-6 px-6'
              label='Total operations'
              value='0'
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
            <StatCard label={`${summary} (kilogram)`} value='292,400.00' />
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
