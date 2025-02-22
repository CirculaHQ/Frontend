import { PageLoader } from '@/components/loaders';
import { EmptyState, FilterModule, ModuleHeader } from '@/components/shared';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DateRangePicker,
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
import { useTableFilters } from '@/hooks';
import { useExportInvoices, useFetchInvoices, useFetchInvoicesSummary } from '@/hooks/api/queries/invoices/useInvoicesQuery';
import { useIsMobile } from '@/hooks/use-mobile';
import { getRelativeTime } from '@/utils/dateFormatter';
import { generateRandomBackgroundColor, getCurrencySymbol } from '@/utils/textFormatter';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { MetricCard } from './components';

const initialParams = {
  state: '',
  type: '',
  country: '',
  archived: false,
};

const Invoices = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { params, handleSearchChange, currentPage, onPageChange } = useTableFilters({ ...initialParams })

  const { exportInvoices, isLoading: isExporting } = useExportInvoices();
  const { data, isLoading: isLoadingInvoices } = useFetchInvoices(params)
  const { data: summary, isLoading: isLoadingSummary } = useFetchInvoicesSummary()

  const currencies = summary ? Object.keys(summary) : []

  const totalPages = data ? Math.ceil(data.count / params.limit) : 0;
  const invoices = data?.results || [];

  const calculateTotalCost = (items: any[], tax: string, discount: string): number => {
    const subTotal = items.reduce((total, item) => total + item.quantity * item.unit_price, 0);
    return (subTotal + Number(tax)) - Number(discount)
  };

  const editInvoice = (e: any, invoiceId: string) => {
    e.stopPropagation()
    navigate(appRoute.editInvoice(invoiceId))
  }

  if (isLoadingInvoices) return <PageLoader />;

  return (
    <div>
      <ModuleHeader title="Sales">
        <div className="flex flex-row items-center gap-3">
          {!isMobile && (
            <div className='flex flex-row items-center w-full justify-start gap-5'>
              <DateRangePicker showRange={true} />
            </div>
          )}
          <Button onClick={exportInvoices} disabled={isExporting} isLoading={isExporting}>
            <Icon name="arrow-up-right" className="w-5 h-5 text-secondary" />
            Export report
          </Button>
          <Button variant="secondary" onClick={() => navigate(appRoute.create_invoice)}>
            <Icon name="plus" className="w-5 h-5 text-[#FAFAFA]" />
            New invoice
          </Button>
        </div>
      </ModuleHeader>
      <div className="flex flex-row items-center w-full justify-between mt-8">
        <span className="text-primary font-semibold text-lg">Your balance</span>
      </div>
      <div className="grid grid-cols-2 sm:flex flex-col md:flex-row items-center justify-between w-full mt-4 gap-6">
        {!currencies.length ? (
          <MetricCard
            icon="flag"
            loading={isLoadingSummary}
            currency={getCurrencySymbol("NGN")?.symbol}
            paidAmount={0}
            paidCount={0}
            awaitingAmount={0}
            awaitingCount={0}
            overdueAmount={0}
            overdueCount={0}
            totalAmount={0}
          />
        ) : (
          <>
            {currencies?.map((item: string) => (
              <MetricCard
                key={item}
                icon={"flag"}
                loading={isLoadingSummary}
                currency={getCurrencySymbol(item)?.symbol}
                paidAmount={summary[item]?.fulfilled.total}
                paidCount={summary[item]?.fulfilled.count}
                awaitingAmount={summary[item]?.pending.total}
                awaitingCount={summary[item]?.pending.count}
                overdueAmount={summary[item]?.overdue.total}
                overdueCount={summary[item]?.overdue.count}
                totalAmount={summary[item]?.total}
              />
            ))}
          </>
        )}
      </div>
      <FilterModule onSearchChange={handleSearchChange} containerClass="mt-8" />
      <div className="mt-2">
        {!isMobile ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow
                  className="cursor-pointer"
                  key={invoice?.code}
                  onClick={() => navigate(`${appRoute.invoiceDetails(invoice.id).path}`)}
                >
                  <TableCell className="w-[100px]">{invoice?.code}</TableCell>
                  <TableCell className="w-[200px]">
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm text-primary">
                        {getRelativeTime(invoice.created_at) ? `${getRelativeTime(invoice.created_at)}` : 'Today'}
                      </span>
                      <h4 className="font-normal text-sm text-tertiary">
                        {format(invoice?.created_at, 'dd/MM/yyyy')}
                      </h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px]'>
                    <div className='flex flex-row items-center gap-3 justify-start'>
                      <Avatar className='w-8 h-8 rounded-full'>
                        <AvatarImage src={invoice?.customer?.photo} />
                        <AvatarFallback
                          style={{ backgroundColor: generateRandomBackgroundColor() }}
                          className='w-8 h-8 rounded-full text-white'
                        >
                          <Icon name='avatar' className='w-8 h-8' />
                        </AvatarFallback>
                      </Avatar>
                      <span className='font-medium text-sm text-primary capitalize'>
                        {invoice?.customer?.business_name || `${invoice?.customer?.first_name || ''} ${invoice?.customer?.last_name || ''}`}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="w-[300px] text-tertiary font-normal text-sm">
                    <Badge variant={invoice.status} className='capitalize'>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="w-[300px] text-tertiary font-normal text-sm">
                    {getCurrencySymbol(invoice?.currency)?.symbol}{calculateTotalCost(invoice?.breakdown, invoice.tax, invoice.discount)?.toLocaleString()}
                  </TableCell>
                  <TableCell className="w-7">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="w-4 h-4">
                          <Icon
                            name="horizontal-dots"
                            className="w-4 h-4 text-quaternary"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="text-sm font-medium text-secondary rounded-[8px] px-1"
                      >
                        <DropdownMenuItem className="py-2  rounded-[8px]" onClick={(e) => editInvoice(e, invoice.id)}>
                          <Icon
                            name="edit"
                            className="w-4 h-4 text-quaternary"
                          />
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="py-2 rounded-[8px]">
                          <Icon
                            name="arrow-up-right"
                            className="w-4 h-4 text-quaternary"
                          />{' '}
                          Export
                        </DropdownMenuItem>
                        <DropdownMenuItem className="py-2 rounded-[8px]">
                          <Icon
                            name="trash"
                            className="w-4 h-4 text-quaternary"
                          />
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
              {invoices.map((invoice) => (
                <TableRow className="cursor-pointer" key={invoice?.code}>
                  <TableCell className="w-[200px] text-tertiary font-normal text-sm">
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm text-primary">
                        Clear Glass
                      </span>
                      <h4 className="font-normal text-sm text-tertiary">
                        Glass
                      </h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px]'>
                    <div className='flex flex-row items-center gap-3 justify-start'>
                      <Avatar className='w-6 h-6 rounded-full'>
                        <AvatarImage src={invoice?.customer?.photo} />
                        <AvatarFallback
                          style={{ backgroundColor: generateRandomBackgroundColor() }}
                          className='w-6 h-6 rounded-full text-white'
                        >
                          <Icon name='avatar' className='w-6 h-6' />
                        </AvatarFallback>
                      </Avatar>
                      <span className='font-medium text-sm text-primary capitalize'>
                        {invoice?.customer?.business_name || `${invoice?.customer?.first_name} ${invoice?.customer?.last_name}`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="w-7">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="w-4 h-4">
                          <Icon
                            name="horizontal-dots"
                            className="w-4 h-4 text-quaternary"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="text-sm font-medium text-secondary rounded-[8px] px-1"
                      >
                        <DropdownMenuItem className="py-2  rounded-[8px]" onClick={(e) => editInvoice(e, invoice.id)}>
                          <Icon
                            name="edit"
                            className="w-4 h-4 text-quaternary"
                          />
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="py-2 rounded-[8px]">
                          <Icon
                            name="arrow-up-right"
                            className="w-4 h-4 text-quaternary"
                          />{' '}
                          Export
                        </DropdownMenuItem>
                        <DropdownMenuItem className="py-2 rounded-[8px]">
                          <Icon
                            name="trash"
                            className="w-4 h-4 text-quaternary"
                          />
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
        {!invoices.length && (
          <EmptyState
            icon='inventory-empty'
            title='No sales yet.'
            description='Create invoice and they will show up here.'
            className='mt-8'
          />
        )}
        {invoices.length !== 0 && (
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
  );
};

export default Invoices;
