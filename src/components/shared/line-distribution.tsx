import React from 'react';
import { InfoIcon, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { TooltipProps } from '../ui/DonutChart';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import BGpatter from '@/assets/images/bg-pattern.png';
import { Icon } from '../ui';

interface SubSegment {
  name: string;
  amount: number;
}

interface Segment {
  color: string;
  weight: number;
  label: string;
  info?: string;
  value?: string;
  percentage?: string;
  subSegments?: SubSegment[];
  colorVariants?: string[];
}

interface LineDistributionProps {
  segments: Segment[];
  height?: number;
  className?: string;
  rounded?: boolean;
  showPercentages?: boolean;
}

const generateColorVariants = (baseColor: string, count: number): string[] => {
  const opacityStep = 0.8 / (count - 1); // Start from 1 and decrease to 0.2
  return Array.from({ length: count }, (_, index) => {
    // Convert hex to rgba
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);
    const opacity = 1 - index * opacityStep;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  });
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='rounded-lg border bg-background p-2 shadow-md'>
        <div className='flex flex-col gap-1'>
          <span className='text-sm font-medium'>{payload[0].name}</span>
          <span className='text-sm text-muted-foreground'>
            {`${((payload[0].value * 100) / payload[0].payload.total).toFixed(1)}% · ${payload[0].value}kg`}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const LineDistribution = ({
  segments,
  height = 8,
  className = '',
  rounded = true,
  showPercentages = true,
}: LineDistributionProps) => {
  const [selectedSegment, setSelectedSegment] = React.useState<Segment | null>(null);
  const [tooltipData, setTooltipData] = React.useState<TooltipProps | null>(null);
  const totalWeight = segments.reduce((sum, segment) => sum + segment.weight, 0);

  const handleSegmentClick = (segment: Segment) => {
    setSelectedSegment(segment);
    setTooltipData(null);
  };

  const pieData = React.useMemo(() => {
    if (!selectedSegment?.subSegments) return [];
    const total = selectedSegment.subSegments.reduce((sum, item) => sum + item.amount, 0);
    return selectedSegment.subSegments.map((segment) => ({
      ...segment,
      total, // Add total to each item for tooltip calculation
    }));
  }, [selectedSegment]);

  // Generate color variants when a segment is selected
  const colorVariants = selectedSegment?.subSegments
    ? generateColorVariants(selectedSegment.color, selectedSegment.subSegments.length)
    : [];

  return (
      <div className={`w-full flex flex-col gap-4 ${className}`}>
        {/* Distribution bars */}
        <div className='w-full flex gap-1' style={{ height: `${height}px` }}>
          {segments.map((segment, index) => {
            const percentage = ((segment.weight / totalWeight) * 100).toFixed(1);
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className={`h-full transition-opacity hover:opacity-80 cursor-pointer
                      ${rounded && index === 0 ? 'rounded-l-full' : ''} 
                      ${rounded && index === segments.length - 1 ? 'rounded-r-full' : ''}`}
                    style={{
                      backgroundColor: segment.color,
                      width: `${(segment.weight / totalWeight) * 100}%`,
                    }}
                    onClick={() => handleSegmentClick(segment)}
                  />
                </TooltipTrigger>
                <TooltipContent className='flex flex-col items-center' side='top' align='center'>
                  <span className='font-medium'>{segment.label}</span>
                  <span className='text-sm'>
                    {showPercentages ? `${percentage}%` : segment.weight}
                  </span>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Legend with responsive grid */}
        <div className='grid grid-cols-2 md:grid-cols-6 gap-4 mt-6'>
          {segments.map((segment, index) => (
            <div key={index} className='flex flex-col items-start text-sm gap-1'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <div className='w-3 h-3' style={{ backgroundColor: segment.color }} />
                <span className='text-sm text-tertiary font-normal'>{segment.label}</span>
                {segment.info && (
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className='w-3 h-3' color='#717680' />
                    </TooltipTrigger>
                    <TooltipContent>{segment.info}</TooltipContent>
                  </Tooltip>
                )}
              </div>
              <span className='text-sm'>
                <span className='font-semibold text-primary'>{segment.percentage}</span> ·{' '}
                <span className='font-normal'>{segment.value}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        <AlertDialog open={!!selectedSegment} onOpenChange={() => setSelectedSegment(null)}>
          <AlertDialogContent className='max-w-md w-full md:max-w-[480px]'>
            <AlertDialogHeader className='space-y-3 relative'>
              <img src={BGpatter} className='absolute top-[-1rem] right-[50%]' />
              <div className='flex items-center justify-between !mt-0'>
                <AlertDialogTitle className='font-semibold text-lg text-primary'>{selectedSegment?.label} distribution</AlertDialogTitle>
                <button
                  onClick={() => setSelectedSegment(null)}
                  className='rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                >
                    <Icon name='x-close' className='h-6 w-6 text-[#A4A7AE]' />
                </button>
              </div>
              <div className='text-sm text-muted-foreground'>
                {selectedSegment?.percentage} · {selectedSegment?.value}
              </div>
            </AlertDialogHeader>

            {/* Pie Chart */}
            <div className='mt-6 h-[200px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx='50%'
                    cy='50%'
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey='amount'
                    nameKey='name'
                  >
                     {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={colorVariants[index]} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} cursor={false} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className='mt-6 space-y-6'>
              {selectedSegment?.subSegments?.map((subSegment, index) => (
                <div key={index} className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3' style={{ backgroundColor: colorVariants[index] }} />
                    <span className='text-tertiary font-normal'>{subSegment.name}</span>
                  </div>
                  <div>
                  <span className='font-semibold'>{`${((subSegment.amount / selectedSegment.weight)).toFixed(1)}% · `}</span>
                  <span>{selectedSegment.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
  );
};

export { LineDistribution };
