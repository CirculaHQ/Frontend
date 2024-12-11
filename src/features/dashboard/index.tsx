import { ModuleHeader } from '@/components/shared';
import {
  Badge,
  BarChart,
  Button,
  DateRangePicker,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  LineChart,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from '@/components/ui';
import { useIsMobile } from '@/hooks/use-mobile';
import { memo, useState } from 'react';

const lineChartData = [
  {
    date: 'Jan 23',
    SolarPanels: 2890,
    Inverters: 2338,
  },
  {
    date: 'Feb 23',
    SolarPanels: 2756,
    Inverters: 2103,
  },
  {
    date: 'Mar 23',
    SolarPanels: 3322,
    Inverters: 2194,
  },
  {
    date: 'Apr 23',
    SolarPanels: 3470,
    Inverters: 2108,
  },
  {
    date: 'May 23',
    SolarPanels: 3475,
    Inverters: 1812,
  },
  {
    date: 'Jun 23',
    SolarPanels: 3129,
    Inverters: 1726,
  },
  {
    date: 'Jul 23',
    SolarPanels: 3490,
    Inverters: 1982,
  },
  {
    date: 'Aug 23',
    SolarPanels: 2903,
    Inverters: 2012,
  },
  {
    date: 'Sep 23',
    SolarPanels: 2643,
    Inverters: 2342,
  },
  {
    date: 'Oct 23',
    SolarPanels: 2837,
    Inverters: 2473,
  },
  {
    date: 'Nov 23',
    SolarPanels: 2954,
    Inverters: 3848,
  },
  {
    date: 'Dec 23',
    SolarPanels: 3239,
    Inverters: 3736,
  },
];

const Dashboard = () => {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 20;
  const totalPages = Math.ceil(100 / reportsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const templates = Array(5).fill(null);

  return (
    <div className='mb-10'>
      <ModuleHeader title='Dashboard' />

      <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-10 mt-8'>
        {/* Line Chart Container */}
        <div className='flex flex-col w-full'>
          <div className='flex flex-row justify-between items-center w-full mb-6'>
            <h2 className='text-primary font-semibold text-lg'>Operations</h2>
            <div className='flex flex-row gap-3'>
              <DateRangePicker />
              <Button>
                <Icon name='filter' className='w-5 h-5 text-secondary' />
                Sorting
              </Button>
            </div>
          </div>

          <div className='w-full h-[400px] min-h-[300px]'>
            <LineChart
              data={lineChartData}
              index='date'
              categories={['Inverters']}
              colors={['green']}
              valueFormatter={(number: number) =>
                `${Intl.NumberFormat('us').format(number).toString()}kg`
              }
              showLegend={true}
              showXAxis={true}
              showYAxis={true}
              showGridLines={true}
              showTooltip={true}
              startEndOnly={false}
              enableLegendSlider={true}
              yAxisWidth={65}
              className='h-full w-full'
            />
          </div>
        </div>

        {/* Bar Chart Container */}
        <div className='flex flex-col w-full'>
          <div className='flex flex-row justify-between items-center w-full mb-6'>
            <h2 className='text-primary font-semibold text-lg'>Inventory</h2>
            <div className='flex flex-row gap-3'>
              <DateRangePicker />
              <Button>
                <Icon name='filter' className='w-5 h-5 text-secondary' />
                Inventory in
              </Button>
            </div>
          </div>

          <div className='w-full h-[400px] min-h-[300px]'>
            <BarChart
              data={lineChartData}
              index='date'
              categories={['SolarPanels', 'Inverters']}
              valueFormatter={(number: number) =>
                `$${Intl.NumberFormat('us').format(number).toString()}`
              }
              onValueChange={(v) => console.log(v)}
              colors={['green', 'lightGreen']}
              showLegend={true}
              showXAxis={true}
              showYAxis={true}
              showGridLines={true}
              showTooltip={true}
              startEndOnly={false}
              enableLegendSlider={true}
              yAxisWidth={65}
              className='h-full w-full'
              type='stacked'
              // Add these properties to control bar width
              barCategoryGap={30} // Controls gap between bar groups
              tickGap={50} // Controls spacing of x-axis ticks
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col w-full mt-10'>
        <div className='flex flex-row justify-between items-center w-full mb-6'>
          <h2 className='text-primary font-semibold text-lg'>Sales</h2>
          <div className='flex flex-row gap-3'>
            <DateRangePicker />
            <Button>
              <Icon name='flag' className='w-5 h-5 text-secondary' />
              Nigerian Naira
            </Button>
          </div>
        </div>

        <div className='w-full h-[400px] min-h-[300px]'>
          <LineChart
            data={lineChartData}
            index='date'
            categories={['SolarPanels', 'Inverters']}
            colors={['green', 'lightGreen']}
            valueFormatter={(number: number) =>
              `${Intl.NumberFormat('us').format(number).toString()}kg`
            }
            showLegend={true}
            showXAxis={true}
            showYAxis={true}
            showGridLines={true}
            showTooltip={true}
            startEndOnly={false}
            enableLegendSlider={true}
            yAxisWidth={65}
            className='h-full w-full'
          />
        </div>
      </div>

      <div className='flex flex-row w-full items-center justify-between mt-10'>
        <h2 className='text-primary font-semibold text-lg'>Recent activities</h2>
        <span className='text-tertiary font-semibold text-sm cursor-pointer'>View all</span>
      </div>

      <div className='mt-5'>
        {!isMobile ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Status</TableHead>
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

export default Dashboard;
