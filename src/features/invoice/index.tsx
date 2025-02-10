import { FilterModule, ModuleHeader } from '@/components/shared';
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
import { useIsMobile } from '@/hooks/use-mobile';
import { generateRandomBackgroundColor, getInitials } from '@/utils/textFormatter';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MetricCardProps = {
  title?: string;
  count?: string;
  amount?: string;
  icon: string;
  currency?: string;
};

const MetricCard = memo(({ icon, currency }: MetricCardProps) => {
  const status = [
    { name: 'Paid invoice (31)', amount: '1,500.00', count: '200.00' },
    { name: 'Awaiting (200)', amount: '1,000.00', count: '2,000.00' },
    { name: 'Overdue (200)', amount: '2,000.00', count: '4,000.00' }
  ]

  const [state, setState] = useState<any>(status[0])
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <div className='border rounded-xl py-2 px-4 w-full'>
          <div className="flex flex-row items-center gap-1 mb-4">
            <Icon name={icon} className="w-6 h-6" />
            <span className="text-primary font-semibold text-lg">{currency}{state.amount}</span>
          </div>
          <div className='space-y-4'>
            {status.map((item) => (
              <div className="flex flex-col items-start">
                <h1 className="text-tertiary font-normal text-xs">{item.name}</h1>
                <h4 className="text-primary text-sm font-semibold">{currency}{item.count}</h4>
              </div>
            ))}
          </div>
        </div>
      ) :
        (<div className="h-[106px] flex gap-4 w-full flex-col items-start justify-center">
          <div className="flex flex-row items-center gap-1">
            <Icon name={icon} className="w-6 h-6" />
            <span className="text-primary font-semibold text-2xl">{currency}{state.amount}</span>
          </div>
          <div className="flex flex-col items-start">
            <h1 className="text-tertiary font-normal text-xs">{state.name}</h1>
            <h4 className="text-primary text-sm font-semibold">{currency}{state.count}</h4>
          </div>
          <div className='flex items-center space-x-1'>
            {status.map((item) => (
              <button key={item.name} onClick={() => setState(item)}>
                <Icon name='dot' fill={state?.name === item.name ? '#181D27' : '#E9EAEB'} className='w-3 h-3' />
              </button>
            ))}
          </div>
        </div>)
      }
    </>
  );
});

const Invoices = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 20;
  const totalPages = Math.ceil(100 / reportsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const templates = Array(5).fill(null);

  return (
    <div>
      <ModuleHeader title="Invoices">
        <div className="flex flex-row items-center gap-3">
          <Button>
            <Icon name="arrow-up-right" className="w-5 h-5 text-secondary" />
            Export report
          </Button>
          <Button variant="secondary" onClick={() => { navigate(appRoute.create_invoice) }}>
            <Icon name="plus" className="w-5 h-5 text-[#FAFAFA]" />
            New invoice
          </Button>
        </div>
      </ModuleHeader>
      <div className="flex flex-row items-center w-full justify-between mt-8">
        <span className="text-primary font-semibold text-lg">Your balance</span>
        <DateRangePicker />
      </div>
      <div className="grid grid-cols-2 sm:flex flex-col md:flex-row items-center justify-between w-full mt-4 gap-6">
        <MetricCard
          icon="flag"
          currency='₦'
        />
        <MetricCard
          icon="us-flag"
          currency='$'
        />
        <MetricCard
          icon="uk-flag"
          currency='￡'
        />
        <MetricCard
          icon="france-flag"
          currency='€'
        />
      </div>
      <FilterModule containerClass="mt-8" />

      <div className="mt-2">
        {!isMobile ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customers</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((_, index) => (
                <TableRow className="cursor-pointer" key={index}>
                  <TableCell className="w-[100px]">INV - 182</TableCell>
                  <TableCell className="w-[200px]">
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm text-primary">
                        5 days ago
                      </span>
                      <h4 className="font-normal text-sm text-tertiary">
                        13/07/2020
                      </h4>
                    </div>
                  </TableCell>

                  <TableCell className='w-[300px]'>
                    <div className='flex flex-row items-center gap-3 justify-start'>
                      <Avatar className='w-6 h-6 rounded-full'>
                        <AvatarImage src='' />
                        <AvatarFallback
                          style={{ backgroundColor: generateRandomBackgroundColor() }}
                          className='w-[24px] h-[24px] rounded-full text-white'
                        >
                          {/* {getInitials(
                            customer.business_name[0] ||
                              `${customer.first_name} ${customer.last_name}`
                          )} */}
                          EU
                        </AvatarFallback>
                      </Avatar>
                      <span className='font-medium text-sm text-primary capitalize'>
                        {/* {customer.business_name || `${customer.first_name} ${customer.last_name}`} */}
                        Emeka Umeh
                      </span>
                    </div>
                  </TableCell>
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

                  <TableCell className="w-[300px] text-tertiary font-normal text-sm">
                    <Badge variant="failed">Completed</Badge>
                  </TableCell>
                  <TableCell className="w-[300px] text-tertiary font-normal text-sm">
                    ₦1,593,775.80
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
                        <DropdownMenuItem className="py-2  rounded-[8px]">
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
              {templates.map((_, index) => (
                <TableRow className="cursor-pointer" key={index}>
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
                        <AvatarImage src='' />
                        <AvatarFallback
                          style={{ backgroundColor: generateRandomBackgroundColor() }}
                          className='w-[24px] h-[24px] rounded-full text-white'
                        >
                          {/* {getInitials(
                            customer.business_name[0] ||
                              `${customer.first_name} ${customer.last_name}`
                          )} */}
                          EU
                        </AvatarFallback>
                      </Avatar>
                      <span className='font-medium text-sm text-primary capitalize'>
                        {/* {customer.business_name || `${customer.first_name} ${customer.last_name}`} */}
                        Emeka Umeh
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
                        <DropdownMenuItem className="py-2  rounded-[8px]">
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
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalReports={100}
          reportsPerPage={reportsPerPage}
        />
      </div>
    </div>
  );
};

export default Invoices;
