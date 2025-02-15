import { PageLoader } from "@/components/loaders";
import { EmptyState, FilterModule } from "@/components/shared";
import { Badge, Icon, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { useFetchOperationsByBatch } from "@/hooks/api/queries/operations/useOperationsQuery";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
    operationId?: string;
}

export default function Operations({ operationId = '' }: Props) {
    const isMobile = useIsMobile();

    const { data, isLoading: isLoadingOperationsByBatch } = useFetchOperationsByBatch(operationId);

    const operations = data ? data.results : []

    const handleSearchChange = () => {}

    if (isLoadingOperationsByBatch) return <PageLoader />

    return (
        <div>
            <FilterModule
                containerClass='mt-8'
                includeRegion={false}
                onSearchChange={handleSearchChange}
            />
            <div>
                {operations.length === 0 ? (
                    <EmptyState
                        icon='inventory-empty'
                        title='No operations started'
                        description='Begin your operations on Circula and they would show up here.'

                    />
                ) : !isMobile ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[100px]'>ID</TableHead>
                                <TableHead>Operation</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Produced</TableHead>
                                <TableHead>Wasted</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {operations.map((item) => (
                                <TableRow className='cursor-pointer' key={item.id}>
                                    <TableCell className='w-[250px]'>{item.code}</TableCell>
                                    <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                                        {item.operation_type}
                                    </TableCell>
                                    <TableCell className='w-[250px]'>
                                        <div className='flex items-center space-x-2'>
                                            <div>
                                                <Icon name='dot' fill='#17B26A' className='w-2 h-2' />
                                                <div className='w-[.1px] h-[14px] border ml-[3px]' />
                                                <Icon name='dot' fill='#717680' className='w-2 h-2 text-quaternary' />
                                            </div>
                                            <div className='flex flex-col items-start space-y-1'>
                                                <p className='text-sm font-medium text-primary'>
                                                    {item.start_date ? `${item.start_date?.split('T')[0]}, ${item.start_time}` : '-'}
                                                </p>
                                                <p className='text-sm text-gray-500 text-primary'>
                                                    {item.end_date ? `${item.end_date?.split('T')[0]}, ${item.end_time}` : '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                                        <Badge variant={item.status} className="capitalize">{item.status}</Badge>
                                    </TableCell>
                                    <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                                        {item.quantity_produced}kg
                                    </TableCell>
                                    <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                                        {item.waste_produced}kg
                                    </TableCell>
                                    <TableCell className='w-7'>
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
                                <TableHead>Operation</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {operations.map((item) => (
                                <TableRow className='cursor-pointer' key={item.id}>
                                    <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                                        {item.operation_type}
                                    </TableCell>
                                    <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                                        <Badge variant={item.status} className="capitalize">{item.status}</Badge>
                                    </TableCell>
                                    <TableCell className='w-7'>
                                        <Icon name='chevron-right' className='w-4 h-4 text-quaternary' />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    )
}