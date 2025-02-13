import { ModuleHeader } from '@/components/shared';
import {
  BarChart,
  Button,
  DateRangePicker,
  Icon,
  LineChart,
} from '@/components/ui';
import { inventoryChartData, operationsChartData, salesChartData } from '@/mocks/dashboard';
import { RecentActivities } from './components';

const Dashboard = () => {
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
              data={operationsChartData}
              index='date'
              categories={['amount']}
              colors={['green']}
              valueFormatter={(number: number) =>
                `${Intl.NumberFormat('us').format(number).toString()}kg`
              }
              showLegend={false}
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
              data={inventoryChartData}
              index='date'
              categories={['Raw materials', 'Ready for sale', 'Waste']}
              valueFormatter={(number: number) =>
                `$${Intl.NumberFormat('us').format(number).toString()}`
              }
              onValueChange={(v) => console.log(v)}
              colors={['green', 'lightGreen', 'green100']}
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
              barCategoryGap={10} // Controls gap between bar groups
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
            data={salesChartData}
            index='date'
            categories={['Overdue', 'Pending', 'Fulfilled']}
            colors={['green100', 'lightGreen', 'green']}
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

      <RecentActivities />
    </div>
  );
};

export default Dashboard;
