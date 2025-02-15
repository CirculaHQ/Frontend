import {
    Badge,
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
import { useFetchRecentActivities } from '@/hooks/api/queries/dashboard/useDashboard';
import { useIsMobile } from '@/hooks/use-mobile';
import { getDaysAgo } from '@/utils/textFormatter';
import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecentActivities({ isPaginated, containerClassName = '' }: { isPaginated: boolean, containerClassName?: string }) {
    const limit = isPaginated ? 20 : 5
    const initialParams = { offset: 0, limit };

    const isMobile = useIsMobile();
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({ ...initialParams });

    const { data } = useFetchRecentActivities(params)

    const totalPages = data ? Math.ceil(data.count / limit) : 0;
    const activities = data?.results || []

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        setParams({ ...params, offset: page - 1 });
    };

    return (
        <div className={containerClassName}>
            <div className='flex flex-row w-full items-center justify-between'>
                <h2 className='text-primary font-semibold text-lg'>Recent activities</h2>
                {!isPaginated && (
                    <button onClick={() => navigate(appRoute.activities)}>
                        <span className='text-tertiary font-semibold text-sm cursor-pointer'>View all</span>
                    </button>
                )}
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
                            {activities.map((activity) => (
                                <TableRow className='cursor-pointer' key={activity?.data?.invoice_id || activity?.data?.code}>
                                    <TableCell className='w-[250px] whitespace-nowrap'>{activity?.data?.code}</TableCell>
                                    <TableCell className='w-[200px]'>
                                        <div className='flex flex-col items-start'>
                                            <span className='font-medium text-sm text-primary'>
                                                {getDaysAgo(activity?.timestamp) ? `${getDaysAgo(activity?.timestamp)} days ago` : 'Today'}
                                            </span>
                                            <h4 className='font-normal text-sm text-tertiary'>{format(activity?.timestamp, 'PP')}</h4>
                                        </div>
                                    </TableCell>
                                    <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                                        {activity?.data?.material ? (
                                            <div className='flex flex-col items-start'>
                                                <span className='font-medium text-sm text-primary'>{activity?.data?.material_type}</span>
                                                <h4 className='font-normal text-sm text-tertiary'>{activity?.data?.material}</h4>
                                            </div>) : <>-</>
                                        }
                                    </TableCell>
                                    <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                                        {activity?.event_type}
                                    </TableCell>
                                    <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                                        <Badge variant='failed'>{activity?.data?.status}</Badge>
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
                            {activities.map((activity) => (
                                <TableRow className='cursor-pointer' key={activity?.data?.invoice_id}>
                                    <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                                        <div className='flex flex-col items-start'>
                                            <span className='font-medium text-sm text-primary'>Clear Glass</span>
                                            <h4 className='font-normal text-sm text-tertiary'>Glass</h4>
                                        </div>
                                    </TableCell>
                                    <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                                        {activity?.data?.operation_type || 'N/A'}
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
                {isPaginated && (
                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        totalReports={data?.count ?? 0}
                        reportsPerPage={limit}
                    />
                )}
            </div>
        </div>
    )
}