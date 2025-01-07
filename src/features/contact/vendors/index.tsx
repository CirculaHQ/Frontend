import { FilterModule, ModuleHeader, TextBadge } from '@/components/shared';
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
import { useFetchVendors } from '@/hooks/api/mutations/dashboard/contact';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Vendors = () => {
  const {data, isLoading} = useFetchVendors();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 20; // Adjust as needed
  const totalPages = Math.ceil(100 / reportsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const templates = Array(5).fill(null);

  return (
    <div>
      <ModuleHeader title='Vendors'>
        <div className='flex flex-row items-center gap-3'>
          <Button>Show archive</Button>
          <Button>Export</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>Add vendor</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='text-sm font-medium text-secondary rounded-[8px] px-1'
            >
              <DropdownMenuItem className='py-2  rounded-[8px] justify-between' onClick={() => navigate(`${appRoute.add_vendor}?type=business`)}>Business <TextBadge text='B'/></DropdownMenuItem>
              <DropdownMenuItem className='py-2 rounded-[8px] justify-between' onClick={() => navigate(`${appRoute.add_vendor}?type=individual`)}>Individual <TextBadge text='I'/></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ModuleHeader>
      <FilterModule containerClass='mt-8' />

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
              {templates.map((_, index) => (
                <TableRow className='cursor-pointer' key={index}>
                  <TableCell className='w-[300px]'>
                    <div className='flex flex-row items-center gap-3 justify-start'>
                      <Avatar className='w-6 h-6 rounded-full'>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className='font-medium text-sm text-primary'>Circular HQ</span>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    admin@circulahq.com
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    +2348012345679
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    Lagos, NG
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    Individual
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
                        <DropdownMenuItem className='py-2  rounded-[8px]'>
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>
                          Assign inventory
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>Archive</DropdownMenuItem>
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
              {templates.map((_, index) => (
                <TableRow className='cursor-pointer' key={index}>
                  <TableCell className='w-[300px]'>
                    <div className='flex flex-row items-center gap-3 justify-start'>
                      <Avatar className='w-6 h-6 rounded-full'>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>Circular HQ</span>
                      <h4 className='font-normal text-sm text-tertiary'>admin@circulahq.com</h4>
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
                        <DropdownMenuItem className='py-2  rounded-[8px]'>
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>
                          Assign inventory
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>Archive</DropdownMenuItem>
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

export default Vendors;
