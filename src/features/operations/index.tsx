import { PageLoader } from '@/components/loaders';
import { EmptyState, FilterModule, FilterTrigger, LineDistribution, ModuleHeader, StatCard } from '@/components/shared';
import {
  Badge,
  Button,
  DateRangePicker,
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
import { useTableFilters } from '@/hooks';
import { useFetchInventoryBreakdown } from '@/hooks/api/queries/inventory';
import { useFetchOperations } from '@/hooks/api/queries/operations/useFetchOperations';
import { useExportOperations, useFetchOperationsBreakdown, useFetchOperationTypes } from '@/hooks/api/queries/operations/useOperationsQuery';
import { useIsMobile } from '@/hooks/use-mobile';
import { getMaterialColor } from '@/utils/materials';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PRODUCED = 'Produced';
const initialParams = {
  type: '',
  batch_only: true
};

const Operations = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { params, handleSearchChange, currentPage, onPageChange, setParams } = useTableFilters({ ...initialParams })
  const [summary, setSummary] = useState(PRODUCED);

  const { data, isLoading } = useFetchOperations(params);
  const { exportOperations, isLoading: isExporting } = useExportOperations();
  const { data: inventoryBreakdown, isLoading: loadingInventoryBreakdown } = useFetchInventoryBreakdown({})
  // const { data: inventoryBreakdown, isLoading: loadingInventoryBreakdown } = useFetchOperationsBreakdown();
  const { data: operationTypes, isLoading: isLoadingOperationTypes } = useFetchOperationTypes()

  const totalPages = data ? Math.ceil(data.count / params.limit) : 0;

  const navigateToView = (e: any, operationId: any) => {
    e.stopPropagation();
    navigate(appRoute.operationDetails(operationId).path);
  };

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

  const handleSelectMaterial = (type: string) => {
    setParams({ ...params, operation_type: type })
  }

  const materialFilterOptions = useMemo(() => {
    const defaultRoles = { label: 'All types', value: '' }
    const enhancedMaterials = operationTypes?.length ? operationTypes.map((role) => ({ label: role.name, value: role.name })) : []
    return [defaultRoles, ...enhancedMaterials]
  }, [operationTypes])

  if (isLoading || loadingInventoryBreakdown) return <PageLoader />;

  return (
    <div>
      <ModuleHeader title='Operations'>
        <div className='flex flex-row items-center gap-3'>
          {!isMobile && (
            <div className='flex flex-row items-center w-full justify-start gap-5'>
              <DateRangePicker showRange={true} />
              <FilterTrigger options={materialFilterOptions} onSelect={handleSelectMaterial} />
            </div>
          )}
          <Button onClick={exportOperations} disabled={isExporting} isLoading={isExporting}>
            Export report
          </Button>
          <Button variant='secondary' onClick={() => navigate(appRoute.add_operation)}>
            New operation
          </Button>
        </div>
        {isMobile && (
          <div className='flex flex-row items-center w-full justify-start gap-5 mt-4'>
            <DateRangePicker showRange={true} onChange={(date) => setParams({ ...params, ...date })} />
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
        {!isMobile ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Produced</TableHead>
                <TableHead>Wasted</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.results.map((item) => (
                <TableRow className='cursor-pointer' key={item.id} onClick={(e) => navigateToView(e, item.id)}>
                  <TableCell className='whitespace-nowrap w-[200px]'>{item.code}</TableCell>
                  <TableCell className='w-[250px] text-tertiary font-normal text-sm'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>{item.material}</span>
                      <h4 className='font-normal text-sm text-tertiary'>{item.material_type}</h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                    <Badge variant={item.status}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                    {item.quantity_produced}kg
                  </TableCell>
                  <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                    {item.waste_produced}kg
                  </TableCell>
                  <TableCell className='w-4'>
                    <Icon name='chevron-right' className='w-4 h-4 text-quaternary' />
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
                <TableRow className='cursor-pointer' key={item.id} onClick={(e) => navigateToView(e, item.id)}>
                  <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>{item?.material}</span>
                      <h4 className='font-normal text-sm text-tertiary'>{item?.material_type}</h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    {item.operation_type || 'N/A'}
                  </TableCell>
                  <TableCell className='w-7'>
                    <Icon name='chevron-right' className='w-4 h-4 text-quaternary' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {!isLoading && !data?.results.length && (
          <EmptyState
            icon='inventory-empty'
            title='No operations started'
            description='Begin your operations on Circula and they would show up here.'
            className='mt-8'
          />
        )}
        {data?.results.length !== 0 && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            totalReports={data?.count ?? 0}
            reportsPerPage={params.limit}
          />
        )}
      </div>
    </div>
  );
};

export default Operations;
