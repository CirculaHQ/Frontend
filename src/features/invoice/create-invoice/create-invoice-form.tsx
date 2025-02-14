import {
    Button,
    Icon,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectSeparator,
    Avatar,
    AvatarImage,
    AvatarFallback,
    DatePicker,
} from '@/components/ui';
import { CURRENCIES } from '@/config/common';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useFetchCustomers } from '@/hooks/api/queries/contacts';
import { useFetchBanks } from '@/hooks/api/queries/settings/useBanks';
import { Customer } from '@/types/customers';
import { LineItem } from '@/types/invoice';
import { Bank } from '@/types/settings';
import { generateRandomBackgroundColor, getCurrencySymbol, getInitials } from '@/utils/textFormatter';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formatDate = (date: string | number | Date) => format(new Date(date), 'yyyy-MM-dd');

export const CreateInvoiceForm: React.FC<{
    formik: any;
    items: LineItem[];
    handleItemChange: (id: string, field: keyof LineItem, value: string) => void;
    handleAddItem: () => void;
    handleRemoveItem: (id: string) => void;
    handleSelectCustomer: (customer: Customer) => void;
    handleSelectBank: (bank: Bank) => void;
    isLoading: boolean;
    salesTax: { amount: string, percent: string };
    setSalesTax: (e: any) => void;
    discount: { amount: string, percent: string };
    setDiscount: (e: any) => void;
    invoiceId?: string;
}> = ({ formik, items, handleItemChange, handleAddItem, handleRemoveItem, handleSelectCustomer, handleSelectBank, isLoading, salesTax, setSalesTax, discount, setDiscount, invoiceId }) => {
    const navigate = useNavigate();

    const limit = 20;
    const initialParams = {
        offset: 0,
        search: '',
        type: '',
        archived: false,
        limit,
    };

    const [params, setParams] = useState({ ...initialParams });
    const { data, isLoading: isLoadingCustomers } = useFetchCustomers(params);
    const { data: allBanks } = useFetchBanks({})

    const customers = data?.results || [];
    const banks = allBanks?.results || [];

    const currencySymbol = formik?.values?.currency ? `(${getCurrencySymbol(formik?.values?.currency)?.symbol})` : ''

    const calculateSubTotal = (items: LineItem[]): number => {
        return items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
    };

    const handleTax = (e: any, type: string) => {
        const { value } = e.target
        const subTotal = calculateSubTotal(items)
        if (type === 'percent') {
            const amount = subTotal * (value / 100) || ''
            setSalesTax({ amount, percent: value })
        } else {
            const percent = (value / subTotal) * 100 || ''
            setSalesTax({ amount: value, percent })
        }
    }

    const handleDiscount = (e: any, type: string) => {
        const { value } = e.target
        const subTotal = calculateSubTotal(items)
        if (type === 'percent') {
            const amount = subTotal * (value / 100) || ''
            setDiscount({ amount, percent: value })
        } else {
            const percent = (value / subTotal) * 100 || ''
            setDiscount({ amount: value, percent })
        }
    }

    useEffect(() => {
        if (salesTax.percent) {
            const subTotal = calculateSubTotal(items)
            const amount = subTotal * (Number(salesTax.percent) / 100) || ''
            setSalesTax({ ...salesTax, amount })
        }
        if (discount.percent) {
            const subTotal = calculateSubTotal(items)
            const amount = subTotal * (Number(discount.percent) / 100) || ''
            setDiscount({ ...discount, amount })
        }
    }, [items])

    return (
        <form className='w-full flex flex-col gap-4' onSubmit={formik.handleSubmit}>
            <div className='w-full flex flex-col gap-1.5'>
                <Label>Customer</Label>
                <Select
                    value={formik.values.customer}
                    onValueChange={(value) => {
                        formik.setFieldValue('customer', value)
                        const customer = customers?.find((customer) => customer.id === value)
                        if (customer) handleSelectCustomer(customer)
                    }}
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder='Select customer'
                            className='text-placeholder font-normal'
                        />
                    </SelectTrigger>
                    <SelectContent loading={isLoadingCustomers}>
                        {customers?.map((customer) => (
                            <SelectItem key={customer?.id} value={customer?.id}>
                                <div className='flex flex-row items-center gap-2 justify-start'>
                                    <Avatar className='w-6 h-6 rounded-full'>
                                        <AvatarImage src={customer?.photo} />
                                        <AvatarFallback
                                            style={{ backgroundColor: generateRandomBackgroundColor() }}
                                            className='w-[24px] h-[24px] rounded-full text-white'
                                        >
                                            {getInitials(
                                                customer?.business_name ?
                                                    customer?.business_name[0] :
                                                    `${customer?.first_name} ${customer?.last_name}`
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className='font-medium text-sm text-primary capitalize'>
                                        {customer?.business_name || `${customer?.first_name} ${customer?.last_name}`}
                                    </span>
                                </div>
                            </SelectItem>
                        ))}
                        <SelectSeparator />
                        <div className='text-tertiary font-normal text-sm px-4 py-2'>Can't find vendor?</div>
                        <div
                            onClick={() => navigate(`${appRoute.add_vendor}?type=business`)}
                            className='px-4 py-2 flex flex-row items-center justify-between'
                        >
                            <div className='flex flex-row items-center gap-2'>
                                <Icon name='user-right' className='w-5 h-5' />
                                <span className='text-sm text-primary font-medium'>Add new business vendor</span>
                            </div>
                            <Icon name='chevron-right' className='w-5 h-5' />
                        </div>

                        <div
                            onClick={() => navigate(`${appRoute.add_vendor}?type=business`)}
                            className='px-4 py-2 flex flex-row items-center justify-between'
                        >
                            <div className='flex flex-row items-center gap-2'>
                                <Icon name='user-right' className='w-5 h-5' />
                                <span className='text-sm text-primary font-medium'>Add new individual vendor</span>
                            </div>
                            <Icon name='chevron-right' className='w-5 h-5' />
                        </div>
                    </SelectContent>
                </Select>
            </div>

            <Input
                id='title'
                type='text'
                placeholder='Title'
                label='Invoice title'
                name='title'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                errorMessage={formik.errors.title && formik.touched.title ? formik.errors.title : ''}
            />

            <div className='w-full'>
                <Label className='mb-1.5'>Due Date</Label>
                <DatePicker
                    date={formik.values.due_date ? new Date(formik.values.due_date) : undefined}
                    onDateChange={(date) => {
                        const formattedDate = date ? formatDate(date) : '';
                        formik.setFieldValue('due_date', formattedDate);
                    }}
                />
            </div>

            <div className='w-full flex flex-col gap-1.5'>
                <Label>Currency</Label>
                <Select
                    value={formik.values.currency}
                    onValueChange={(value) => formik.setFieldValue('currency', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder='Select currency' className='text-placeholder font-normal' />
                    </SelectTrigger>
                    <SelectContent>
                        {CURRENCIES.map((item) => (
                            <SelectItem key={item.shortCode} value={item.shortCode}>{item.name} - {item.shortCode}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                {items.map((item) => (
                    <div key={item.id} className='flex flex-col gap-4 mb-2'>
                        <div className='w-full grid grid-cols-12 items-start gap-3'>
                            {/* Item Name - Takes up most space */}
                            <div className={items.length > 1 ? 'col-span-5 md:col-span-7' : 'col-span-7 md:col-span-7'}>
                                <Input
                                    type='text'
                                    label='Item name'
                                    value={item.item_name}
                                    onChange={(e) => handleItemChange(item.id, 'item_name', e.target.value)}
                                />
                            </div>

                            {/* Quantity - Small fixed width */}
                            <div className='col-span-2 md:col-span-2'>
                                <Input
                                    type='number'
                                    label='Qty'
                                    value={item.quantity || ''}
                                    onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                                    min='1'
                                />
                            </div>

                            {/* Unit Price - Medium fixed width */}
                            <div
                                className={items.length > 1 ? 'col-span-3 md:col-span-2' : 'col-span-3 md:col-span-3'}
                            >
                                <Input
                                    type='number'
                                    label='Unit price'
                                    value={item.unit_price || ''}
                                    onChange={(e) => handleItemChange(item.id, 'unit_price', e.target.value)}
                                    min='0'
                                />
                            </div>

                            {/* Delete Icon - Only show if there's more than one item */}
                            {items.length > 1 && (
                                <div className='col-span-2 md:col-span-1 flex justify-center'>
                                    <div className='h-10 w-10 bg-[#FAFAFA] rounded-lg flex items-center justify-center mt-6'>
                                        <Icon
                                            name='trash'
                                            className='w-4 h-4 text-[#A4A7AE] cursor-pointer hover:text-red-500 transition-colors'
                                            onClick={() => handleRemoveItem(item.id)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div
                className='text-disabled mt-[-1rem] text-sm font-normal cursor-pointer hover:text-[#2C6000] hover:underline'
                onClick={handleAddItem}
            >
                + Add Item
            </div>
            <div className='flex items-center gap-x-2'>
                <Input
                    id='salesTax'
                    type='text'
                    label={`Sales tax ${currencySymbol}`}
                    name='tax'
                    onChange={(e) => handleTax(e, '')}
                    onBlur={formik.handleBlur}
                    value={salesTax.amount}
                    // errorMessage={
                    //     formik.errors.tax && formik.touched.tax ? formik.errors.tax : ''
                    // }
                />
                <Input
                    id='salesTax'
                    type='text'
                    label='Sales tax (%)'
                    tag='%'
                    name='tax'
                    onChange={(e) => handleTax(e, 'percent')}
                    onBlur={formik.handleBlur}
                    value={salesTax.percent}
                    containerClassName='w-[150px]'
                    // errorMessage={
                    //     formik.errors.tax && formik.touched.tax ? formik.errors.tax : ''
                    // }
                />
            </div>

            <div className='flex items-center gap-x-2'>
                <Input
                    id='discount'
                    type='text'
                    label={`Discount ${currencySymbol}`}
                    name='discount'
                    onChange={(e) => handleDiscount(e, '')}
                    onBlur={formik.handleBlur}
                    value={discount.amount}
                    // errorMessage={
                    //     formik.errors.discount && formik.touched.discount ? formik.errors.discount : ''
                    // }
                />
                <Input
                    id='discount'
                    type='text'
                    label='Discount'
                    tag='%'
                    name='discount'
                    onChange={(e) => handleDiscount(e, 'percent')}
                    onBlur={formik.handleBlur}
                    value={discount.percent}
                    containerClassName='w-[150px]'
                    // errorMessage={
                    //     formik.errors.discount && formik.touched.discount ? formik.errors.discount : ''
                    // }
                />
            </div>

            <Input
                id='additionalNote'
                type='text'
                label='Additional Note'
                name='notes'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.notes}
                errorMessage={
                    formik.errors.notes && formik.touched.notes
                        ? formik.errors.notes
                        : ''
                }
            />

            <div className='w-full flex flex-col gap-1.5'>
                <Label>Bank account</Label>
                <Select
                    value={formik.values.account}
                    onValueChange={(value) => {
                        formik.setFieldValue('account', value)
                        const bank = banks?.find((bank) => bank.bank_name === value)
                        if (bank) handleSelectBank(bank)
                    }}
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder='Select your bank account'
                            className='text-placeholder font-normal'
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {banks.map((item) => (
                            <SelectItem key={item.id} value={item.bank_name}>{item.bank_name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className='flex justify-end gap-4 mt-8'>
                <Button variant='outline' disabled={isLoading} onClick={() => navigate(appRoute.invoices)}>
                    Cancel
                </Button>
                <Button type='submit' variant='secondary' disabled={isLoading} isLoading={isLoading}>
                    {invoiceId ? 'Edit' : 'Create'} invoice
                </Button>
            </div>
        </form>
    );
};

