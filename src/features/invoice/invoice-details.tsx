import { PageLoader } from "@/components/loaders";
import { BackButton, InvoicePreview, ModuleHeader } from "@/components/shared";
import { Badge, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Icon } from "@/components/ui";
import { appRoute } from "@/config/routeMgt/routePaths";
import { useFetchInvoice } from "@/hooks/api/queries/invoices/useInvoicesQuery";
import { LineItem } from "@/types/invoice";
import { capitalizeFirstLetterOfEachWord, getCurrencySymbol } from "@/utils/textFormatter";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";

export default function InvoiceDetails() {
    const navigate = useNavigate()
    const { invoiceId } = useParams()
    const { data, isLoading: isLoadingInvoice } = useFetchInvoice(invoiceId ?? '')

    if (isLoadingInvoice) return <PageLoader />;
    if (!data) return <>No data found!!!</>;

    const calculateSubTotal = (items: LineItem[]): number => {
        return items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
    };

    const calculateTotal = (items: LineItem[], tax: number | string, discount: number | string): number => {
        const subTotal = items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
        return subTotal + Number(tax) - Number(discount);
    };

    const previewData = {
        companyInfo: {
            name: data ? capitalizeFirstLetterOfEachWord((data?.customer?.business_name || `${data?.customer?.first_name} ${data?.customer?.last_name}`)) : 'Company Name',
            address: data?.customer?.address || 'Company address',
            city: data?.customer?.state || 'City',
            country: data?.customer?.country || 'Country',
            phone: data?.customer?.phone_number || '+0 (000) 123-4567',
            taxId: data?.customer?.tax_id,
        },
        invoiceData: {
            title: data?.title || '-----',
            number: data?.code || '-----',
            date: data?.created_at ? format(new Date(data?.created_at), 'PP') : '',
            dueDate: data?.due_date ? format(data?.due_date, 'PP') : '-----',
            items: data?.breakdown || [],
            tax: data?.tax || 0,
            discount: data?.discount || 0,
            total: calculateTotal(data?.breakdown, data?.tax || 0, data?.discount || 0),
            subtotal: calculateSubTotal(data?.breakdown),
            currency: getCurrencySymbol(data?.currency)?.symbol,
            additionalNote: data?.notes,
            bankDetails: {
                name: data?.account?.account_name || '-----',
                ifsCode: 'ABCD000XXXX',
                swiftCode: 'ABCDUSBBXXX',
                accountNumber: data?.account?.account_number || '-----',
            },
        },
    };

    const editInvoice = () => {
        navigate(appRoute.editInvoice(invoiceId))
    }

    return (
        <div className='max-w-[1024px]'>
            <BackButton route={appRoute.invoices} label='Back to Invoices' />
            <div className="sm:flex justify-between mb-[40px]">
                <div className="flex items-center mb-3 sm:mb-0">
                    <ModuleHeader title={`Invoice ${data?.code}`} className='w-fit' />
                    <Badge variant={data?.status} className='capitalize ml-4'>{data?.status}</Badge>
                </div>
                <div className="flex flex-row items-center gap-3">
                    <Button onClick={editInvoice}>
                        <Icon name="edit" className="w-5 h-5 text-secondary" />
                        Edit invoice
                    </Button>
                    <Button>
                        <Icon name="file-06" className="w-5 h-5 text-secondary" />
                        Download invoice
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <Icon
                                    name='horizontal-dots'
                                    className='w-4 h-4 text-quaternary'
                                    fill='none'
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align='end'
                            className='text-sm font-medium text-secondary rounded-[8px] px-1'
                        >
                            <DropdownMenuItem
                                className='py-2 rounded-[8px]'
                            //onClick={(e) => navigateToEditCustomer(e, customer)}
                            >
                                Cancel invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem className='py-2 rounded-[8px]'>
                                Download receipt
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="flex md:space-x-6">
                <div className='bg-[#F5F5F5] p-4 w-full hidden sm:block'>
                    <InvoicePreview
                        companyInfo={previewData.companyInfo}
                        invoiceData={previewData.invoiceData}
                    />
                </div>
                <div className="w-[400px] sm:border-l sm:pl-6">
                    <p className="text-sm font-semibold">Activity</p>
                    <hr className="mt-3 mb-5 bg-[#181D27]" />
                    <div>
                        <div className="flex space-x-4">
                            <Icon name="dot" fill="#D5D7DA" className="w-2 h-2" />
                            <div className="text-sm -mt-2">
                                <p className="font-semibold">Invoice created</p>
                                <p className="text-tertiary">12 Nov, 2024 - 10:30 AM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}