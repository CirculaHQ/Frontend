import { EmptyState, FilterModule } from "@/components/shared";
import { Avatar, AvatarFallback, AvatarImage, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Icon, Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow } from "@/components/ui";
import { useTableFilters } from "@/hooks";
import { useIsMobile } from "@/hooks/use-mobile";
import { teams } from "@/mocks/teams";
import { getRelativeTime } from "@/utils/dateFormatter";
import { format } from "date-fns";
import InviteUsers from "./InviteUsers";

const VERIFIED = 'verified';
const PENDING = 'pending';
const initialParams = {
    role: '',
};

export default function Team() {
    const { params, handleSearchChange, currentPage, onPageChange } = useTableFilters({ ...initialParams })
    const isMobile = useIsMobile();

    const data = teams
    const totalPages = data ? Math.ceil(data.count / params.limit) : 0;

    const handleExport = () => { }

    //if (isLoading || loadingInventoryBreakdown) return <PageLoader />;

    const renderStatusIcon = (status: string) => {
        if (status.toLowerCase() === VERIFIED) return <Icon name='check-circle' className='w-2 h-2 absolute bottom-0 right-0' />
        if (status.toLowerCase() === PENDING) return <Icon name='info-circle' className='w-2 h-2 absolute bottom-0 right-0' />
        return ''
    }

    const renderDropdown = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='w-4 h-4'>
                    <Icon
                        name='horizontal-dots'
                        className='w-4 h-4 text-quaternary'
                        fill='none'
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='end'
                className='text-sm font-medium text-secondary rounded-[8px] px-1'
            >
                <DropdownMenuItem
                    className='py-2 rounded-[8px]'
                //onClick={(e) => navigateToEditCustomer(e, customer)}
                >
                    Edit details
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    return (
        <div>
            <div className="sm:flex justify-between items-center mb-6 space-y-4">
                <div className='flex flex-col items-start'>
                    <h2 className='text-lg font-semibold text-primary'>Team management</h2>
                    <p className='text-tertiary font-normal text-sm'>
                        Manage your team members and their account permissions here.
                    </p>
                </div>
                <div className='flex flex-row items-center gap-3'>
                    <Button variant='outline' onClick={handleExport}>
                        Export
                    </Button>
                    <InviteUsers />
                </div>
            </div>
            <div>
                <FilterModule
                    containerClass=''
                    includeRegion={false}
                    includeTypes={false}
                    includeRoles={true}
                    onSearchChange={handleSearchChange}
                />
                <div className='mt-2'>
                    {data?.results.length === 0 ? (
                        <EmptyState
                            icon='users-plus'
                            title='No team members added'
                            description='Add your team members on Circula to manage them here.'
                        />
                    ) : !isMobile ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='w-[200px]'>Name</TableHead>
                                    <TableHead className='w-[200px]'>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Date added</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.results.map((item) => (
                                    <TableRow className='cursor-pointer' key={item.id}>
                                        <TableCell>
                                            <div className='flex flex-row items-center gap-3 justify-start'>
                                                <Avatar className='w-8 h-8 rounded-full shrink-0'>
                                                    <AvatarImage src={item?.photo} />
                                                    <AvatarFallback
                                                        style={{ backgroundColor: '#2C6000' }}
                                                        className='rounded-full text-white'
                                                    >
                                                        <Icon name='avatar' className='w-8 h-8' />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className='text-sm text-primary capitalize block'>
                                                    <span className="block">{item?.first_name} {item?.last_name}</span>
                                                    <span className="block">{item.status}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                                            {item.email}
                                        </TableCell>
                                        <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                                            {item.role}
                                        </TableCell>
                                        <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                                            <div className="flex flex-col items-start">
                                                <span className="font-medium text-sm text-primary">
                                                    {getRelativeTime(item.created_at)}
                                                </span>
                                                <h4 className="font-normal text-sm text-tertiary">
                                                    {format(item?.created_at, 'dd/MM/yyyy')}
                                                </h4>
                                            </div>
                                        </TableCell>
                                        <TableCell className='w-4'>
                                            {renderDropdown()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.results.map((item) => (
                                    <TableRow className='cursor-pointer' key={item.id}>
                                        <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                                            <div className='flex flex-row items-center gap-3 justify-start'>
                                                <div className="relative">
                                                    <Avatar className='w-8 h-8 rounded-full shrink-0'>
                                                        <AvatarImage src={item?.photo} />
                                                        <AvatarFallback
                                                            style={{ backgroundColor: '#2C6000' }}
                                                            className='rounded-full text-white'
                                                        >
                                                            <Icon name='avatar' className='w-8 h-8' />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {renderStatusIcon(item.status)}
                                                </div>
                                                <div className='text-sm text-primary capitalize block'>
                                                    <span className="block">{item?.first_name} {item?.last_name}</span>
                                                    <span className="block text-tertiary lowercase">{item.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                                            {item.role}
                                        </TableCell>
                                        <TableCell className='w-7'>
                                            {renderDropdown()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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
        </div>
    )
}