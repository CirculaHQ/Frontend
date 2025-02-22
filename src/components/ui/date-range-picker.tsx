'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Icon } from './icon';

interface Props {
  showRange?: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>;
  onChange: (e: any) => void;
}

const formatDate = (date: string | number | Date) => format(new Date(date), 'yyyy-MM-dd');

export function DateRangePicker({ className, showRange = false, onChange }: Readonly<Props>) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const currentDate = new Date();
  const startDate = date?.from ?? currentDate;
  const endDate = date?.to ?? currentDate;

  React.useEffect(() => {
    if (date?.from && date?.to) {
      onChange({
        start_date: formatDate(date?.from),
        end_date: formatDate(date?.to)
      })
    }
  }, [date])

  const handleSelect = (date: any) => {
    setDate(date)
    //if (date?.from && date?.to) setOpen(false);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {showRange ? (
            <div>
              {date?.from && date?.to ?
                <div className='flex flex-row items-center gap-1 cursor-pointer'>
                  <span className='text-tertiary font-semibold text-sm'>
                    {format(startDate, 'dd MMM, yyyy')} - {format(endDate, 'dd MMM, yyyy')}
                  </span>
                  <Icon name='chevron-down' className='w-5 h-5 text-tertiary' />
                </div> :
                <div className='gap-2 flex flex-row items-center justify-center cursor-pointer'>
                  <span className='text-placeholder font-normal text-sm capitalize'>
                    Date range
                  </span>
                  <Icon name='chevron-down' className='w-5 h-5 text-quaternary' fill='none' />
                </div>
              }
            </div>
          ) : (
            <Button id='date'>
              <Icon name='calendar' className='w-5 h-5 text-secondary' />
              <span className='text-placeholder'>
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span className='text-secondary text-sm'>Select dates</span>
                )}
              </span>
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
