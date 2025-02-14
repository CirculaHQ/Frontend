import { Button, DateRangePicker, Icon, LineChart } from "@/components/ui";
import { salesChartData } from "@/mocks/dashboard";

export default function Sales() {
    return(
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
    )
}