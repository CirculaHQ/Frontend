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
import { useEditVendor } from '@/hooks/api/mutations/contacts';
import { useExportVendors, useFetchVendors } from '@/hooks/api/queries/contacts';
import { useIsMobile } from '@/hooks/use-mobile';
import { Customer } from '@/types/customers';
import { generateRandomBackgroundColor, getInitials } from '@/utils/textFormatter';
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

const Vendors = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState({ ...initialParams });

  const { data, isLoading } = useFetchVendors(params);
  const { exportVendors, isLoading: isExporting } = useExportVendors();
  const { mutateAsync: editVendor, isLoading: isEditingVendor } = useEditVendor();

  const vendors = data?.results || [];
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

  const toggleArchive = () => {
    setParams({ ...params, archived: !params.archived });
  };

  const archiveVendor = async (e: any, vendor: Customer) => {
    e.stopPropagation();
    const { id } = vendor;
    await editVendor({ vendorId: id, payload: { archived: !vendor.archived } });
  };

  const navigateToEditVendor = (e: any, vendor: Customer) => {
    e.stopPropagation()
    navigate(`${appRoute.editVendor(vendor?.id)}`)
  }

  return (
    <div>
      <ModuleHeader title='Vendors'>
        <div className='flex flex-row items-center gap-3'>
          <Button disabled={isLoading} onClick={toggleArchive}>
            {params.archived ? 'Hide' : 'Show'} archive
          </Button>
          <Button onClick={exportVendors} disabled={isExporting} isLoading={isExporting}>
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>Add vendor</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='text-sm font-medium text-secondary rounded-[8px] px-1'
            >
              {customerTypes.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  className='py-2 rounded-[8px] justify-between capitalize'
                  onClick={() => navigate(`${appRoute.add_vendor}?type=${item.label}`)}
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
              {vendors.map((vendor) => (
                <TableRow className='cursor-pointer' key={vendor?.id} onClick={() => navigate(`${appRoute.vendorDetails(vendor.id).path}`)}>
                  <TableCell className='w-[300px]'>
                    <div className='flex flex-row items-center gap-3 justify-start'>
                      <Avatar className='w-6 h-6 rounded-full'>
                        <AvatarImage src={vendor?.photo} />
                        <AvatarFallback
                          style={{ backgroundColor: generateRandomBackgroundColor() }}
                          className='w-[24px] h-[24px] rounded-full text-white'
                        >
                          {getInitials(
                            vendor?.business_name ?
                              vendor?.business_name[0] :
                              `${vendor?.first_name} ${vendor?.last_name}`
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <span className='font-medium text-sm text-primary capitalize'>
                        {vendor?.business_name || `${vendor?.first_name} ${vendor?.last_name}`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    {vendor?.email}
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    {vendor?.phone_number}
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm capitalize'>
                    {vendor?.state}
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm capitalize'>
                    {vendor?.type}
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
                        <DropdownMenuItem className='py-2  rounded-[8px]' onClick={(e) => navigateToEditVendor(e, vendor)}>
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>
                          Assign inventory
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]' onClick={(e) => archiveVendor(e, vendor)}>
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
              {vendors.map((vendor) => (
                <TableRow className='cursor-pointer' key={vendor?.id}>
                  <TableCell className='w-[300px]'>
                    <div className='flex flex-row items-center gap-3 justify-start'>
                      <Avatar className='w-6 h-6 rounded-full'>
                        <AvatarImage src={vendor.photo} />
                        <AvatarFallback
                          style={{ backgroundColor: generateRandomBackgroundColor() }}
                          className='w-[24px] h-[24px] rounded-full text-white'
                        >
                          {getInitials(
                            vendor?.business_name ?
                              vendor?.business_name[0] :
                              `${vendor?.first_name} ${vendor?.last_name}`
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <span className='font-medium text-sm text-primary capitalize'>
                        {vendor?.business_name || `${vendor?.first_name} ${vendor?.last_name}`}
                      </span>
                      <h4 className='font-normal text-sm text-tertiary'>{vendor?.email}</h4>
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
                        <DropdownMenuItem className='py-2  rounded-[8px]' onClick={(e) => navigateToEditVendor(e, vendor)}>
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>
                          Assign inventory
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]' onClick={(e) => archiveVendor(e, vendor)}>
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
        {data?.results?.length !== 0 && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            totalReports={data?.count ?? 0}
            reportsPerPage={limit}
          />
        )}
        {!isLoading && !vendors?.length ? (
          <EmptyState
            icon='users-right'
            title='No vendors yet'
            description='Add a vendor and they will show up here.'
            className='mt-8'
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Vendors;
