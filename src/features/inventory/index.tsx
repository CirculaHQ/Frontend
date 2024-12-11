import { FilterModule, LineDistribution, ModuleHeader, TextBadge } from '@/components/shared';
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
import { useIsMobile } from '@/hooks/use-mobile';
import { memo, useState } from 'react';

type MetricCardProps = {
  title: string;
  count: string;
};

const Operations = () => {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 20;
  const totalPages = Math.ceil(100 / reportsPerPage);

  const data = [
    {
      color: '#181D27',
      weight: 20,
      label: 'Glass',
      percentage: '34.4%',
      value: '100kg',
      info: 'Information about glass recycling',
      subSegments: [
        { name: 'Polyethylene Terephthalate (PET)', amount: 34.4 },
        { name: 'High-Density Polyethylene (HDPE)', amount: 34.4 },
        { name: 'Low-Density Polyethylene (LDPE)', amount: 34.4 },
        { name: 'Polypropylene (PP)', amount: 34.4 },
        { name: 'Polystyrene (PS)', amount: 34.4 },
        { name: 'Poly Vinyl Chloride (PVC)', amount: 34.4 },
        { name: 'Nylon', amount: 34.4 },
      ],
    },
    {
      color: '#7F56D9',
      weight: 25,
      label: 'Paper/cardboard',
      percentage: '34.4%',
      value: '100kg',
      info: 'Information about paper recycling',
      subSegments: [
        { name: 'Polyethylene Terephthalate (PET)', amount: 34.4 },
        { name: 'High-Density Polyethylene (HDPE)', amount: 34.4 },
        { name: 'Low-Density Polyethylene (LDPE)', amount: 34.4 },
        { name: 'Polypropylene (PP)', amount: 34.4 },
        { name: 'Polystyrene (PS)', amount: 34.4 },
        { name: 'Poly Vinyl Chloride (PVC)', amount: 34.4 },
        { name: 'Nylon', amount: 34.4 },
      ],
    },
    {
      color: '#F04438',
      weight: 15,
      label: 'Plastics',
      percentage: '34.4%',
      value: '100kg',
      info: 'Information about plastic recycling',
      subSegments: [
        { name: 'Polyethylene Terephthalate (PET)', amount: 34.4 },
        { name: 'High-Density Polyethylene (HDPE)', amount: 34.4 },
        { name: 'Low-Density Polyethylene (LDPE)', amount: 34.4 },
        { name: 'Polypropylene (PP)', amount: 34.4 },
        { name: 'Polystyrene (PS)', amount: 34.4 },
        { name: 'Poly Vinyl Chloride (PVC)', amount: 34.4 },
        { name: 'Nylon', amount: 34.4 },
      ],
    },
    {
      color: '#F79009',
      weight: 15,
      label: 'Metals',
      percentage: '34.4%',
      value: '100kg',
      info: 'Information about metal recycling',
      subSegments: [
        { name: 'Polyethylene Terephthalate (PET)', amount: 34.4 },
        { name: 'High-Density Polyethylene (HDPE)', amount: 34.4 },
        { name: 'Low-Density Polyethylene (LDPE)', amount: 34.4 },
        { name: 'Polypropylene (PP)', amount: 34.4 },
        { name: 'Polystyrene (PS)', amount: 34.4 },
        { name: 'Poly Vinyl Chloride (PVC)', amount: 34.4 },
        { name: 'Nylon', amount: 34.4 },
      ],
    },
    {
      color: '#17B26A',
      weight: 15,
      label: 'E-wastes',
      percentage: '34.4%',
      value: '100kg',
      info: 'Information about e-waste recycling',
      subSegments: [
        { name: 'Polyethylene Terephthalate (PET)', amount: 34.4 },
        { name: 'High-Density Polyethylene (HDPE)', amount: 34.4 },
        { name: 'Low-Density Polyethylene (LDPE)', amount: 34.4 },
        { name: 'Polypropylene (PP)', amount: 34.4 },
        { name: 'Polystyrene (PS)', amount: 34.4 },
        { name: 'Poly Vinyl Chloride (PVC)', amount: 34.4 },
        { name: 'Nylon', amount: 34.4 },
      ],
    },
    {
      color: '#D444F1',
      weight: 10,
      label: 'Rubber',
      percentage: '34.4%',
      value: '100kg',
      info: 'Information about rubber recycling',
      subSegments: [
        { name: 'Polyethylene Terephthalate (PET)', amount: 34.4 },
        { name: 'High-Density Polyethylene (HDPE)', amount: 34.4 },
        { name: 'Low-Density Polyethylene (LDPE)', amount: 34.4 },
        { name: 'Polypropylene (PP)', amount: 34.4 },
        { name: 'Polystyrene (PS)', amount: 34.4 },
        { name: 'Poly Vinyl Chloride (PVC)', amount: 34.4 },
        { name: 'Nylon', amount: 34.4 },
      ],
    },
  ];

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const templates = Array(5).fill(null);

  return (
    <div className='mb-10'>
      <ModuleHeader title='Inventory'>
        <div className='flex flex-row items-center gap-3'>
          <Button>Export</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>Update inventory</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='text-sm font-medium text-secondary rounded-[8px] px-1'
            >
              <DropdownMenuItem className='py-2  rounded-[8px] justify-between'>
                Inventory in <TextBadge text='I' />
              </DropdownMenuItem>
              <DropdownMenuItem className='py-2 rounded-[8px] justify-between'>
                Inventory out <TextBadge text='0' />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ModuleHeader>
      <div className='flex flex-row items-center w-full justify-start gap-5 mt-8'>
        <DateRangePicker />
        <div className='flex flex-row items-center gap-1'>
          <span className='text-tertiary font-semibold text-sm'>All material</span>
          <Icon name='chevron-down' className='w-5 h-5 text-tertiary' />
        </div>
      </div>
      <div className='mt-8'>
        <div className='gap-2 flex flex-col'>
          <h4 className='text-tertiary font-semibold text-sm'>Total Material (kilogram)</h4>
          <h1 className='font-semibold text-primary text-3xl'>292,400.00</h1>
        </div>
        <div className='mt-4'>
          <span className='text-sm font-normal text-tertiary'>Material distribution</span>
          <LineDistribution segments={data} height={8} className='mt-4' />
        </div>
      </div>

      <FilterModule containerClass='mt-8' includeRegion={false} />

      <div className='mt-2'>
        {!isMobile ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead className='w-[100px]'>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Quantity </TableHead>
                <TableHead>Date received</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((_, index) => (
                <TableRow className='cursor-pointer' key={index}>
                  <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>Clear Glass</span>
                      <h4 className='font-normal text-sm text-tertiary'>Glass</h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px]'>
                    <div className='flex flex-row items-center gap-3 justify-start'>
                      <Avatar className='w-6 h-6 rounded-full'>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className='text-sm text-tertiary'>Circular HQ</span>
                    </div>
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    ₦1,593,775.80
                  </TableCell>
                  <TableCell className='w-[300px] text-tertiary font-normal text-sm'>
                    1,000 kg
                  </TableCell>
                  <TableCell className='w-[200px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>5 days ago</span>
                      <h4 className='font-normal text-sm text-tertiary'>13/07/2020</h4>
                    </div>
                  </TableCell>

                  <TableCell className='w-7'>
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
                        <DropdownMenuItem className='py-2  rounded-[8px]'>
                          <Icon name='edit' className='w-4 h-4 text-quaternary' />
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>
                          <Icon name='arrow-up-right' className='w-4 h-4 text-quaternary' /> Export
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>
                          <Icon name='trash' className='w-4 h-4 text-quaternary' />
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
                <TableHead>Quantity</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((_, index) => (
                <TableRow className='cursor-pointer' key={index}>
                  <TableCell className='w-[200px] text-tertiary font-normal text-sm'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>Clear Glass</span>
                      <h4 className='font-normal text-sm text-tertiary'>Glass</h4>
                    </div>
                  </TableCell>
                  <TableCell className='w-[200px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm text-primary'>1,000 kg</span>
                      <h4 className='font-normal text-sm text-tertiary'>₦1,593,775.80</h4>
                    </div>
                  </TableCell>

                  <TableCell className='w-7'>
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
                        <DropdownMenuItem className='py-2  rounded-[8px]'>
                          <Icon name='edit' className='w-4 h-4 text-quaternary' />
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>
                          <Icon name='arrow-up-right' className='w-4 h-4 text-quaternary' /> Export
                        </DropdownMenuItem>
                        <DropdownMenuItem className='py-2 rounded-[8px]'>
                          <Icon name='trash' className='w-4 h-4 text-quaternary' />
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

export default Operations;
