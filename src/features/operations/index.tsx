import { FilterModule, LineDistribution, ModuleHeader } from '@/components/shared';
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
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const data = [
  {
    color: '#181D27',
    weight: 20,
    label: 'Glass',
    percentage: '34.4%',
    value: '100kg',
    info: 'Information about glass recycling',
    subSegments: [
      { name: 'Polyethylene Terephthalate (PET)', amount: 34.4 },
      { name: 'High-Density Polyethylene (HDPE)', amount: 34.4 },
      { name: 'Low-Density Polyethylene (LDPE)', amount: 34.4 },
      { name: 'Polypropylene (PP)', amount: 34.4 },
      { name: 'Polystyrene (PS)', amount: 34.4 },
      { name: 'Poly Vinyl Chloride (PVC)', amount: 34.4 },
      { name: 'Nylon', amount: 34.4 },
    ],
  },
  {
    color: '#7F56D9',
    weight: 25,
    label: 'Paper/cardboard',
    percentage: '34.4%',
    value: '100kg',
    info: 'Information about paper recycling',
    subSegments: [
      { name: 'Polyethylene Terephthalate (PET)', amount: 34.4 },
      { name: 'High-Density Polyethylene (HDPE)', amount: 34.4 },
      { name: 'Low-Density Polyethylene (LDPE)', amount: 34.4 },
      { name: 'Polypropylene (PP)', amount: 34.4 },
      { name: 'Polystyrene (PS)', amount: 34.4 },
      { name: 'Poly Vinyl Chloride (PVC)', amount: 34.4 },
      { name: 'Nylon', amount: 34.4 },
    ],
  },
  {
    color: '#F04438',
    weight: 15,
    label: 'Plastics',
    percentage: '34.4%',
    value: '100kg',
    info: 'Information about plastic recycling',
    subSegments: [
      { name: 'Polyethylene Terephthalate (PET)', amount: 34.4 },
      { name: 'High-Density Polyethylene (HDPE)', amount: 34.4 },
      { name: 'Low-Density Polyethylene (LDPE)', amount: 34.4 },
      { name: 'Polypropylene (PP)', amount: 34.4 },
      { name: 'Polystyrene (PS)', amount: 34.4 },
      { name: 'Poly Vinyl Chloride (PVC)', amount: 34.4 },
      { name: 'Nylon', amount: 34.4 },
    ],
  },
  {
    color: '#F79009',
    weight: 15,
    label: 'Metals',
    percentage: '34.4%',
    value: '100kg',
    info: 'Information about metal recycling',
    subSegments: [
      { name: 'Polyethylene Terephthalate (PET)', amount: 34.4 },
      { name: 'High-Density Polyethylene (HDPE)', amount: 34.4 },
      { name: 'Low-Density Polyethylene (LDPE)', amount: 34.4 },
      { name: 'Polypropylene (PP)', amount: 34.4 },
      { name: 'Polystyrene (PS)', amount: 34.4 },
      { name: 'Poly Vinyl Chloride (PVC)', amount: 34.4 },
      { name: 'Nylon', amount: 34.4 },
    ],
  },
  {
    color: '#17B26A',
    weight: 15,
    label: 'E-wastes',
    percentage: '34.4%',
    value: '100kg',
    info: 'Information about e-waste recycling',
    subSegments: [
      { name: 'Polyethylene Terephthalate (PET)', amount: 34.4 },
      { name: 'High-Density Polyethylene (HDPE)', amount: 34.4 },
      { name: 'Low-Density Polyethylene (LDPE)', amount: 34.4 },
      { name: 'Polypropylene (PP)', amount: 34.4 },
      { name: 'Polystyrene (PS)', amount: 34.4 },
      { name: 'Poly Vinyl Chloride (PVC)', amount: 34.4 },
      { name: 'Nylon', amount: 34.4 },
    ],
  },
  {
    color: '#D444F1',
    weight: 10,
    label: 'Rubber',
    percentage: '34.4%',
    value: '100kg',
    info: 'Information about rubber recycling',
    subSegments: [
      { name: 'Polyethylene Terephthalate (PET)', amount: 34.4 },
      { name: 'High-Density Polyethylene (HDPE)', amount: 34.4 },
      { name: 'Low-Density Polyethylene (LDPE)', amount: 34.4 },
      { name: 'Polypropylene (PP)', amount: 34.4 },
      { name: 'Polystyrene (PS)', amount: 34.4 },
      { name: 'Poly Vinyl Chloride (PVC)', amount: 34.4 },
      { name: 'Nylon', amount: 34.4 },
    ],
  },
];


type MetricCardProps = {
  title: string;
  count: string;
  className?: string;
};


const MetricCard = memo(({ title, count, className }: MetricCardProps) => {
  return (
    <div className={cn('pt-6 flex gap-2 w-full flex-col items-start justify-center  border-t border-t-[#D5D7DA]', className)}>
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

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const templates = Array(5).fill(null);

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
      
      <div className='flex flex-row items-center w-full justify-start gap-5 mt-8'>
        <DateRangePicker />
        <div className='flex flex-row items-center gap-1'>
          <span className='text-tertiary font-semibold text-sm'>All material</span>
          <Icon name='chevron-down' className='w-5 h-5 text-tertiary' />
        </div>
      </div>

      <div className='flex flex-col md:flex-row  items-center justify-between w-full mt-8'>
        <MetricCard title='Produced (Kilogram)' count='292,400' />
        <MetricCard title='Waste yield (Kilogram)' count='2,899' className='border-l border-t-[#D5D7DA] pl-6' />
        <MetricCard title='Total operations' count='500' className='border-l border-t-[#D5D7DA] pl-6'/>
      </div>

       
        <div className='mt-4'>
          <span className='text-sm font-normal text-tertiary'>Material distribution</span>
          <LineDistribution segments={data} height={8} className='mt-4' />
        </div>
      <FilterModule containerClass='mt-8' />

      <div className='mt-2'>
        {!isMobile ? (
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
              {templates.map((_, index) => (
                <TableRow className='cursor-pointer' key={index}>
                  <TableCell className='w-[100px]'>OP - 182</TableCell>
                  <TableCell className='w-[200px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>5 days ago</span>
                      <h4 className='font-normal text-sm text-tertiary'>13/07/2020</h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>Clear Glass</span>
                      <h4 className='font-normal text-sm text-tertiary'>Glass</h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    Sorting
                  </TableCell>

                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    <Badge variant='failed'>Completed</Badge>
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    690 kg
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    1,000 kg
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
              {templates.map((_, index) => (
                <TableRow className='cursor-pointer' key={index}>
                  <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>Clear Glass</span>
                      <h4 className='font-normal text-sm text-tertiary'>Glass</h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    Sorting
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
