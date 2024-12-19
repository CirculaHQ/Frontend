import { FilterModule, ModuleHeader } from '@/components/shared';
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
