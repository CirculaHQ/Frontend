import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Icon } from "@/components/ui"
import { useDeleteTeamMember } from "@/hooks/api/mutations/settings/useTeamMutation"
import { Member } from "@/types/team"

const SUPER_ADMIN = 'super_admin';

export default function ManageTeamMember({ data }: Readonly<{ data: Member }>) {
    const { mutate: deleteMember, isLoading: isDeleting } = useDeleteTeamMember()

    return (
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
                <DropdownMenuItem
                    className='py-2 rounded-[8px]'
                    disabled={data.role === SUPER_ADMIN || isDeleting}
                    onClick={() => deleteMember(data.id)}
                >
                    Delete member
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}