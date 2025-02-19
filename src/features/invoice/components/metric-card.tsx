import { Icon } from "@/components/ui";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface MetricCardProps {
    paidAmount: number;
    paidCount: number;
    awaitingAmount: number;
    awaitingCount: number;
    overdueAmount: number;
    overdueCount: number;
    icon: string;
    currency?: string;
    totalAmount: number;
    loading: boolean;
};

export default function MetricCard({
    icon,
    currency,
    paidAmount,
    paidCount,
    awaitingAmount,
    awaitingCount,
    overdueAmount,
    overdueCount,
    totalAmount,
    loading = true
}: Readonly<MetricCardProps>) {
    const status = [
        { name: `Paid invoice (${paidCount})`, amount: paidAmount },
        { name: `Awaiting (${awaitingCount})`, amount: awaitingAmount },
        { name: `Overdue (${overdueCount})`, amount: overdueAmount }
    ]

    const [state, setState] = useState<any>(status[0])
    const isMobile = useIsMobile();

    if (loading) {
        return (
            <>
                {isMobile ? (
                    // Mobile Skeleton
                    <div className="border rounded-xl py-2 px-4 w-full animate-pulse">
                        <div className="flex flex-row items-center gap-1 mb-4">
                            <div className="bg-gray-300 rounded-full w-6 h-6" />
                            <div className="bg-gray-300 h-6 w-24 rounded" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, index) => (
                                <div key={index} className="flex flex-col items-start">
                                    <div className="bg-gray-300 h-2 w-32 rounded mb-1" />
                                    <div className="bg-gray-300 h-4 w-20 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Desktop Skeleton
                    <div className="h-[106px] flex gap-4 w-full flex-col items-start justify-center animate-pulse">
                        <div className="flex flex-row items-center gap-1">
                            <div className="bg-gray-300 rounded-full w-6 h-6" />
                            <div className="bg-gray-300 h-8 w-32 rounded" />
                        </div>
                        <div className="bg-gray-300 h-4 w-36 rounded" />
                        <div className="bg-gray-300 h-5 w-24 rounded" />
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3].map((_, index) => (
                                <div key={index} className="bg-gray-300 w-3 h-3 rounded-full" />
                            ))}
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <>
            {isMobile ? (
                <div className='border rounded-xl py-2 px-4 w-full'>
                    <div className="flex flex-row items-center gap-1 mb-4">
                        <Icon name={icon} className="w-6 h-6" />
                        <span className="text-primary font-semibold text-lg">{currency}{totalAmount?.toLocaleString()}</span>
                    </div>
                    <div className='space-y-4'>
                        {status.map((item) => (
                            <div key={item.name} className="flex flex-col items-start">
                                <h1 className="text-tertiary font-normal text-xs">{item.name}</h1>
                                <h4 className="text-primary text-sm font-semibold">{currency}{item.amount.toLocaleString()}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            ) :
                (<div className="h-[106px] flex gap-4 w-full flex-col items-start justify-center">
                    <div className="flex flex-row items-center gap-1">
                        <Icon name={icon} className="w-6 h-6" />
                        <span className="text-primary font-semibold text-2xl">{currency}{totalAmount?.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-start">
                        <h1 className="text-tertiary font-normal text-xs">{state.name}</h1>
                        <h4 className="text-primary text-sm font-semibold">{currency}{state.amount.toLocaleString()}</h4>
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
};