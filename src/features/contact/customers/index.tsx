import { EmptyState, FilterModule, ModuleHeader, TextBadge } from '@/components/shared';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
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
import { useEditCustomer } from '@/hooks/api/mutations/contacts';
import { useFetchCustomers } from '@/hooks/api/queries/contacts';
import { useIsMobile } from '@/hooks/use-mobile';
import { Customer } from '@/types/customers';
import { getInitials } from '@/utils/textFormatter';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const limit = 20;
const initialParams = {
  offset: 0,
  search: '',
  state: '',
  type: '',
  country: '',
  archived: false,
  limit,
};

const Customers = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState({ ...initialParams });
  const { data, isLoading, isInitialFetch } = useFetchCustomers(params);
  const { mutate: editCustomer, isLoading: isEditingCustomer } = useEditCustomer(() => {});

  if (isInitialFetch) return <p>Loading...</p>;

  const customers = data?.results || [];
  const totalPages = data ? Math.ceil(data.count / limit) : 0;

  const customerTypes = [
    { label: 'business', icon: <TextBadge text='B' /> },
    { label: 'individual', icon: <TextBadge text='I' /> },
  ];

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setParams({ ...params, offset: page - 1 });
  };

  const onSearchChange = (search: string) => {
    setParams({ ...params, search });
  };

  const navigateToEditCustomer = (e: any, customer: Customer) => {
    e.stopPropagation();
    navigate(`${appRoute.add_customer}?type=${customer.type}&id=${customer.id}`);
  };

  const toggleArchive = () => {
    setParams({ ...params, archived: !params.archived });
  };

  const archiveCustomer = (e: any, customer: Customer) => {
    e.stopPropagation();
    const { id } = customer;
    editCustomer({ customerId: id, payload: { archived: !customer.archived } });
  };

  const exportAllCustomers = async () => {
    //await exportCustomers()
  };

  return (
    <div>
      <ModuleHeader title='Customers'>
        <div className='flex flex-row items-center gap-3'>
          <Button disabled={isLoading} onClick={toggleArchive}>
            {!params.archived ? 'Show' : 'Hide'} archive
          </Button>
          <Button onClick={exportAllCustomers}>Export</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>Add customer</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='text-sm font-medium text-secondary rounded-[8px] px-1'
            >
              {customerTypes.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  className='py-2 rounded-[8px] justify-between capitalize'
                  onClick={() => navigate(`${appRoute.add_customer}?type=${item.label}`)}
                >
                  {item.label} {item.icon}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ModuleHeader>
      <FilterModule onSearchChange={onSearchChange} containerClass='mt-8' />
      <div className='mt-2'>
        {!isMobile ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone number</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Type</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  className='cursor-pointer'
                  key={customer.id}
                  onClick={() => navigate(`${appRoute.customers}/${customer.id}`)}
                >
                  <TableCell className='w-[300px]'>
                    <div className='flex flex-row items-center gap-3 justify-start'>
                      <Avatar className='w-6 h-6 rounded-full'>
                        <AvatarImage src={customer.photo} />
                        <AvatarFallback>
                          {getInitials(
                            customer.business_name[0] ||
                              `${customer.first_name} ${customer.last_name}`
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <span className='font-medium text-sm text-primary capitalize'>
                        {customer.business_name || `${customer.first_name} ${customer.last_name}`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    {customer.email}
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    {customer.phone_number}
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm capitalize'>
                    {customer.state}
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm capitalize'>
                    {customer.type}
                  </TableCell>
                  <TableCell className='w-7'>
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
                          onClick={(e) => navigateToEditCustomer(e, customer)}
                        >
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>
                          Assign inventory
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='py-2 rounded-[8px]'
                          onClick={(e) => archiveCustomer(e, customer)}
                        >
                          Archive
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
                <TableHead className='w-[100px]'>Name</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow className='cursor-pointer' key={customer.id}>
                  <TableCell className='w-[300px]'>
                    <div className='flex flex-row items-center gap-3 justify-start'>
                      <Avatar className='w-6 h-6 rounded-full'>
                        <AvatarImage src={customer.photo} />
                        <AvatarFallback>
                          {getInitials(
                            customer.business_name[0] ||
                              `${customer.first_name} ${customer.last_name}`
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col items-start'>
                        <span className='font-medium text-sm text-primary'>
                          {customer.business_name || `${customer.first_name} ${customer.last_name}`}
                        </span>
                        <h4 className='font-normal text-sm text-tertiary'>{customer.email}</h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='w-7'>
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
                          className='py-2  rounded-[8px]'
                          onClick={(e) => navigateToEditCustomer(e, customer)}
                        >
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>
                          Assign inventory
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='py-2 rounded-[8px]'
                          onClick={(e) => archiveCustomer(e, customer)}
                        >
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
            reportsPerPage={limit}
          />
        )}
      </div>
      {!isLoading && !customers.length ? (
        <EmptyState
          icon='users-right'
          title='No customers yet'
          description='Add a customer and they will show up here.'
          className='mt-8'
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Customers;
