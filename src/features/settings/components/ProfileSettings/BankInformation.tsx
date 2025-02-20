import { FormSection } from "@/components/shared";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Icon, Input, Textarea } from "@/components/ui";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { addBank, Bank, deleteBank, editBank, getBanks } from "@/hooks/api/mutations/settings/bank";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

interface Props {
    userID: string;
}

export default function BankInformation({ userID }: Readonly<Props>) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingBank, setEditingBank] = useState<Bank | null>(null);

    const bankFormik = useFormik({
        initialValues: {
            nickname: '',
            bank_name: '',
            account_number: '',
            account_name: '',
            notes: '',
            user: userID,
        },
        onSubmit: async (values) => {
            try {
                if (isEditMode && editingBank) {
                    const response = await editBank(editingBank.id, values);
                    setBanks(
                        banks.map((bank) =>
                            bank.id === editingBank.id ? { ...response, id: editingBank.id } : bank
                        )
                    );
                } else {
                    const response = await addBank({ ...values, user: userID });
                    const newBank: Bank = {
                        ...values,
                        id: response.id,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    };
                    setBanks([...banks, newBank]);
                }

                bankFormik.resetForm();
                setIsDialogOpen(false);
                setIsEditMode(false);
                setEditingBank(null);
            } catch (error) {
                console.error('Error adding/editing bank:', error);
            }
        },
    });

    const handleEdit = (bank: Bank) => {
        setIsEditMode(true);
        setEditingBank(bank);
        bankFormik.setValues({
            nickname: bank.nickname,
            bank_name: bank.bank_name,
            account_number: bank.account_number,
            account_name: bank.account_name,
            notes: bank.notes,
            user: bank.user,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (bankId: string) => {
        try {
            await deleteBank(bankId);
            setBanks(banks.filter((bank) => bank.id !== bankId));
        } catch (error) {
            console.error('Error deleting bank:', error);
        }
    };

    const fetchBanks = async (limit: number = 100, offset: number = 0) => {
        if (userID) {
            try {
                const response = await getBanks(limit, offset);
                setBanks(response.results);
            } catch (error) {
                console.error('Error fetching banks:', error);
            }
        }
    };

    useEffect(() => {
        fetchBanks();
    }, [userID]);

    return (
        <div>
            <FormSection title='Bank information' description='Supporting text goes here'>
                {banks.length === 0 ? (
                    <div>
                        <h2 className='text-sm text-secondary font-semibold'>No bank account added</h2>
                        <p className='text-sm text-tertiary font-normal'>
                            Add a bank account to your profile and they will show up here
                        </p>
                    </div>
                ) : (
                    <div className='w-full divide-y'>
                        {banks.map((bank, index) => (
                            <div
                                key={index}
                                className='grid grid-cols-[1fr_auto] gap-4 items-center w-full py-4'
                            >
                                <div className='flex flex-col gap-0.5'>
                                    <p className='text-sm font-medium'>{bank.nickname}</p>
                                    <p className='text-sm text-gray-500'>{bank.account_name}</p>
                                </div>
                                <div className='flex items-center justify-end gap-4'>
                                    <div className='flex flex-col gap-0.5 text-right'>
                                        <p className='text-sm font-medium'>{bank.bank_name}</p>
                                        <p className='text-sm text-gray-500'>{bank.account_number}</p>
                                    </div>
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
                                            <DropdownMenuItem className='py-2 rounded-[8px]'>
                                                Copy account
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className='py-2 rounded-[8px]'
                                                onClick={() => handleEdit(bank)}
                                            >
                                                Edit account
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className='py-2 rounded-[8px]'
                                                onClick={() => handleDelete(bank.id)}
                                            >
                                                Delete account
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Button
                    variant='outline'
                    onClick={(event) => {
                        event.preventDefault();
                        setIsEditMode(false);
                        bankFormik.resetForm();
                        setIsDialogOpen(true);
                    }}
                >
                    Add bank account
                </Button>
            </FormSection>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className='sm:max-w-[500px]'>
                    <Icon name='bank-modal' className='w-10 h-10 mb-4' />
                    <DialogHeader>
                        <DialogTitle>{isEditMode ? 'Edit bank account' : 'Add bank account'}</DialogTitle>
                        <DialogDescription>
                            This account will be used when you send out invoices.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={bankFormik.handleSubmit}>
                        <div className='grid gap-4 py-4'>
                            <Input
                                label='Nickname'
                                placeholder='e.g. Naira account'
                                name='nickname'
                                onChange={bankFormik.handleChange}
                                onBlur={bankFormik.handleBlur}
                                value={bankFormik.values.nickname}
                                errorMessage={
                                    bankFormik.errors.nickname && bankFormik.touched.nickname
                                        ? bankFormik.errors.nickname
                                        : ''
                                }
                            />
                            <Input
                                label='Bank name'
                                placeholder='e.g. Access Bank'
                                name='bank_name'
                                onChange={bankFormik.handleChange}
                                onBlur={bankFormik.handleBlur}
                                value={bankFormik.values.bank_name}
                                errorMessage={
                                    bankFormik.errors.bank_name && bankFormik.touched.bank_name
                                        ? bankFormik.errors.bank_name
                                        : ''
                                }
                            />
                            <Input
                                label='Account number'
                                placeholder='e.g. 0000000000'
                                name='account_number'
                                onChange={bankFormik.handleChange}
                                onBlur={bankFormik.handleBlur}
                                value={bankFormik.values.account_number}
                                errorMessage={
                                    bankFormik.errors.account_number && bankFormik.touched.account_number
                                        ? bankFormik.errors.account_number
                                        : ''
                                }
                            />
                            <Input
                                label='Account name'
                                placeholder='e.g. Drew Cano'
                                name='account_name'
                                onChange={bankFormik.handleChange}
                                onBlur={bankFormik.handleBlur}
                                value={bankFormik.values.account_name}
                                errorMessage={
                                    bankFormik.errors.account_name && bankFormik.touched.account_name
                                        ? bankFormik.errors.account_name
                                        : ''
                                }
                            />
                            <Textarea
                                id='notes'
                                placeholder='SWIFT code, Routing number, etc.'
                                label='Additional notes (Optional)'
                                name='notes'
                                onChange={bankFormik.handleChange}
                                onBlur={bankFormik.handleBlur}
                                value={bankFormik.values.notes}
                                errorMessage={
                                    bankFormik.errors.notes && bankFormik.touched.notes ? bankFormik.errors.notes : ''
                                }
                            />
                        </div>
                        <DialogFooter>
                            <Button variant='outline' type='button' onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type='submit' variant='secondary'>
                                {isEditMode ? 'Save changes' : 'Add account'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}