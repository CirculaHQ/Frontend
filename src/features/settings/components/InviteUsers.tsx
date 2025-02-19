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

export default function InviteUsers() {
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            role: ''
        },
        //validationSchema: isBusiness ? AddCustomerSchema.Business : AddCustomerSchema.Individual,
        onSubmit: async (values) => {
            console.log(values)
        },
    });

    const roles = [
        { name: 'Super admin' },
        { name: 'Admin' },
        { name: 'Finance' },
        { name: 'Inventory & operations' }
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='secondary'>
                    Invite users
                </Button>
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
                                <RolesInCircula />
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
                                    {roles.map((role) => (
                                        <SelectItem key={role.name} value={role.name}>
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="flex items-center mt-8">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full mt-4 sm:mt-0"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            variant="secondary"
                            className="w-full"
                        >
                            Add member
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}