import { Button, DateRangePicker, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Icon, LineChart } from "@/components/ui";
import { chartDurationFilter } from "@/config/common";
import { useFetchDashboardOperations } from "@/hooks/api/queries/dashboard/useDashboard";
import { useFetchOperationTypes } from "@/hooks/api/queries/operations/useOperationsQuery";
import { operationsChartData } from "@/mocks/dashboard";
import { ChartResponse } from "@/types/dashboard";
import { useState } from "react";

type FormattedMonth = {
    label: string;
    amount: number;
};

export default function Operations() {
    const [state, setState] = useState({ duration: '1D', type: 'Sorting' })

    //const { data, isLoading } = useFetchDashboardOperations(state)
    const { data: operationTypes, isLoading: isLoadingOperationTypes } = useFetchOperationTypes()

    const convertMonthData = (data: ChartResponse): FormattedMonth[] => {
        return Object.entries(data).map(([month, amount]) => ({ label: month, amount }))
    };

    //const chartData = data ? convertMonthData(data) : []
    const options = operationTypes ?? []

    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-between items-center w-full mb-6'>
                <h2 className='text-primary font-semibold text-lg'>Operations</h2>
                <div className='flex flex-row gap-3'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button type="submit">
                                <Icon name='filter' className='w-5 h-5 text-secondary' />
                                {state.duration}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align='end'
                            className='text-sm font-medium text-secondary rounded-[8px] px-1 max-h-[200px] overflow-y-auto'
                        >
                            {chartDurationFilter.map((item) => (
                                <DropdownMenuItem
                                    key={item.name}
                                    className='py-2 rounded-[8px]'
                                    onClick={() => setState({ ...state, duration: item.name })}
                                >
                                    {item.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button type="submit">
                                <Icon name='filter' className='w-5 h-5 text-secondary' />
                                {state.type}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align='end'
                            className='text-sm font-medium text-secondary rounded-[8px] px-1 max-h-[200px] overflow-y-auto'
                        >
                            {isLoadingOperationTypes ? <>Loading types...</> :
                                (<>
                                    {options.map((item) => (
                                        <DropdownMenuItem
                                            key={item.name}
                                            className='py-2 rounded-[8px]'
                                            onClick={() => setState({ ...state, type: item.name })}
                                        >
                                            {item.name}
                                        </DropdownMenuItem>
                                    ))}
                                </>)
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className='w-full h-[400px] min-h-[300px]'>
                <LineChart
                    data={operationsChartData}
                    index='label'
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
    )
}