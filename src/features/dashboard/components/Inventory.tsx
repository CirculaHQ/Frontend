import { BarChart, Button, DateRangePicker, Icon } from "@/components/ui";
import { inventoryChartData } from "@/mocks/dashboard";

export default function Inventory() {
    return(
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
                `${Intl.NumberFormat('us').format(number).toString()}kg`
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
    )
}