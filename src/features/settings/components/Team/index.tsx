import { EmptyState, FilterModule, FilterTrigger } from "@/components/shared";
import { Avatar, AvatarFallback, AvatarImage, Button, Icon, Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow } from "@/components/ui";
import { useTableFilters } from "@/hooks";
import { useIsMobile } from "@/hooks/use-mobile";
import { getRelativeTime } from "@/utils/dateFormatter";
import { format } from "date-fns";
import { useFetchTeamMembers, useFetchTeamRoles } from "@/hooks/api/queries/settings/useTeam";
import { PageLoader } from "@/components/loaders";
import InviteUsers from "./InviteUsers";
import ManageTeamMember from "./ManageTeamMember";
import { useMemo } from "react";

const VERIFIED = 'verified';
const PENDING = 'pending';
const initialParams = {
    role: '',
};

export default function Team() {
    const { params, handleSearchChange, currentPage, onPageChange, setParams } = useTableFilters({ ...initialParams })
    const isMobile = useIsMobile();

    const { data: roles, isLoading: isLoadingRoles } = useFetchTeamRoles()
    const { data, isLoading: isLoadingMembers } = useFetchTeamMembers(params)

    const members = data?.results || [];
    const totalPages = data ? Math.ceil(data.count / params.limit) : 0;

    const handleExport = () => { }

    const handleSelectRole = (role: string) => {
        setParams({ ...params, role })
    }

    const renderStatusIcon = (status: boolean) => {
        if (status) return <Icon name='check-circle' className='w-2 h-2 absolute bottom-0 right-0' />
        if (!status) return <Icon name='info-circle' className='w-2 h-2 absolute bottom-0 right-0' />
    }

    const roleFilterOptions = useMemo(() => {
        const defaultRoles = { label: 'All roles', value: '' }
        const enhancedRoles = roles?.length ? roles.map((role) => ({ label: role.name, value: role.name })) : []
        return [defaultRoles, ...enhancedRoles]
    }, [roles])

    if (isLoadingMembers) return <PageLoader />;

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
                    <InviteUsers roles={roles || []} />
                </div>
            </div>
            <div>
                <FilterModule
                    containerClass=''
                    includeRegion={false}
                    includeTypes={false}
                    onSearchChange={handleSearchChange}
                >
                    <FilterTrigger options={roleFilterOptions} onSelect={handleSelectRole} />
                </FilterModule>
                <div className='mt-2'>
                    {!isMobile ? (
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
                                {members?.map((item) => (
                                    <TableRow className='cursor-pointer' key={item.id}>
                                        <TableCell>
                                            <div className='flex flex-row items-center gap-3 justify-start'>
                                                <Avatar className='w-8 h-8 rounded-full shrink-0'>
                                                    <AvatarImage src={item?.picture ?? ''} className='object-cover' />
                                                    <AvatarFallback
                                                        style={{ backgroundColor: '#2C6000' }}
                                                        className='rounded-full text-white'
                                                    >
                                                        <Icon name='avatar' className='w-8 h-8' />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className='text-sm text-primary capitalize block'>
                                                    <span className="block">{item?.first_name} {item?.last_name}</span>
                                                    <span className={`block text-xs ${item.is_active ? VERIFIED : PENDING}`}>
                                                        {item.is_active ? VERIFIED : PENDING}
                                                    </span>
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
                                            <ManageTeamMember data={item} />
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
                                {members.map((item) => (
                                    <TableRow className='cursor-pointer' key={item.id}>
                                        <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                                            <div className='flex flex-row items-center gap-3 justify-start'>
                                                <div className="relative">
                                                    <Avatar className='w-8 h-8 rounded-full shrink-0'>
                                                        <AvatarImage src={item?.picture ?? ''} />
                                                        <AvatarFallback
                                                            style={{ backgroundColor: '#2C6000' }}
                                                            className='rounded-full text-white'
                                                        >
                                                            <Icon name='avatar' className='w-8 h-8' />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {renderStatusIcon(item.is_active)}
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
                                            <ManageTeamMember data={item} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                    {!isLoadingMembers && !members.length ? (
                        <EmptyState
                            icon='users-plus'
                            title='No team members added'
                            className='mt-8'
                            description='Add your team members on Circula to manage them here.'
                        />
                    ) : ''}
                    {members?.length !== 0 && (
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