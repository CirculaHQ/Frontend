import { Button, Icon, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useFormik } from "formik";
import RolesInCircula from "./RolesInCircula";
import { useFetchTeamRoles } from "@/hooks/api/queries/settings/useTeam";
import * as Yup from 'yup';
import { useAddTeamMember } from "@/hooks/api/mutations/settings/useTeamMutation";
import { useState } from "react";

const InviteTeamMemberSchema = Yup.object().shape({
    first_name: Yup.string()
        .matches(/^[A-Za-z]+$/, 'First name must contain letters only')
        .min(2, 'First name must be at least 2 characters')
        .required('First name is required'),
    last_name: Yup.string()
        .matches(/^[A-Za-z]+$/, 'Last name must contain letters only')
        .min(2, 'Last name must be at least 2 characters')
        .required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    role: Yup.string().required('Role is required'),
});

const InviteUserForm = ({ cancelDialog }: { cancelDialog: () => void }) => {
    const { data: roles, isLoading: isLoadingRoles } = useFetchTeamRoles()
    const { mutate: addMember, isLoading: isAddingMember } = useAddTeamMember(cancelDialog);

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            role: ''
        },
        validationSchema: InviteTeamMemberSchema,
        onSubmit: async (values) => {
            addMember(values)
        },
    });

    return (
        <Dialog open={true} onOpenChange={cancelDialog}>
            <DialogTrigger asChild>
                {/* <Button variant='secondary'>
                        Invite users
                    </Button> */}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <div className="border p-3 w-12 h-12 rounded-lg mb-4">
                        <Icon name='users-plus' className='h-6 w-6 text-[#A4A7AE]' />
                    </div>
                    <DialogTitle>Add team member</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            id='first-name'
                            type='text'
                            placeholder='e.g. John'
                            label='First name'
                            name='first_name'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.first_name}
                            errorMessage={
                                formik.errors.first_name && formik.touched.first_name
                                    ? formik.errors.first_name
                                    : ''
                            }
                        />
                        <Input
                            id='last-name'
                            type='text'
                            placeholder='e.g. John'
                            label='Last name'
                            name='last_name'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.last_name}
                            errorMessage={
                                formik.errors.last_name && formik.touched.last_name
                                    ? formik.errors.last_name
                                    : ''
                            }
                        />
                        <Input
                            id='email'
                            type='email'
                            placeholder='example@circula.com'
                            label='Email address'
                            name='email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            errorMessage={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
                        />
                        <div>
                            <div className="space-x-1">
                                <Label>Role</Label>
                                <RolesInCircula roles={roles || []} />
                            </div>
                            <Select
                                value={formik.values.role}
                                onValueChange={(value) => formik.setFieldValue('role', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder='Select role'
                                        className='text-placeholder font-normal'
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles?.map((role) => (
                                        <SelectItem key={role.name} value={role.name} className="capitalize">
                                            {role.name.replace(/_/g, ' ')}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {formik.errors.role && formik.touched.role && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.role}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter className="flex items-center mt-8">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full mt-4 sm:mt-0"
                                onClick={cancelDialog}
                                disabled={isAddingMember}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            variant="secondary"
                            className="w-full"
                            disabled={isAddingMember}
                            isLoading={isAddingMember}
                        >
                            Add member
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default function InviteUsers() {
    const [isOpen, setIsOpen] = useState(false)

    const cancelDialog = () => {
        setIsOpen(false)
    }

    const openDialog = () => {
        setIsOpen(true)
    }

    return (
        <div>
            <Button variant='secondary' onClick={openDialog}>
                Invite users
            </Button>
            {isOpen && <InviteUserForm cancelDialog={cancelDialog} />}
        </div>
    )
}