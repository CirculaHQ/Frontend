import { Button, Icon } from "@/components/ui";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    title: string;
    description: string;
    isComplete: boolean;
    icon: string;
}

export function Layout({ children, icon, title = '', description = '', isComplete = false }: Props) {
    return (
        <AccordionItem className='border-0' value={title} key={title}>
            <AccordionTrigger className='no-underline hover:no-underline focus:no-underline !pt-0 flex items-center justify-between'>
                <div className="flex items-center space-x-6 w-full">
                    <Icon name={icon} className="w-8 h-8 border p-2 rounded-sm" />
                    <div className="text-start">
                        <h1 className="text-base font-semibold text-primary">{title}</h1>
                        <p className="text-sm text-tertiary font-normal">{description}</p>
                    </div>
                </div>
                <div className="text-xs text-secondary font-medium border py-1 px-2 rounded-lg whitespace-nowrap mr-2">
                    {isComplete ?
                        <><Icon name='dot' className="w-2 h-2 inline" fill="#17B26A" /> Complete</> :
                        <><Icon name='dot' className="w-2 h-2 inline" fill="#A4A7AE" /> 2 items left</>
                    }
                </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
                <div className="py-6 space-y-6 border-l pl-[31.5px] sm:pl-[39.5px] ml-[14px] sm:ml-[16px] pr-4">
                    {children}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

interface ItemProps {
    icon: string;
    label: string;
    onClick: (e: any) => void;
    isComplete: boolean;
    buttonName: string;
}

export function Item({ icon, label, onClick, buttonName, isComplete = false }: ItemProps) {
    return (
        <div className="flex space-x-3">
            <Icon name={icon} className='w-[18px] h-[18px] text-quaternary shrink-0' />
            <div className="flex flex-col sm:flex-row justify-between items-start space-y-3 w-full">
                <p className="text-sm font-medium text-secondary">{label}</p>
                {!isComplete ?
                    <Button className="sm:!mt-0" onClick={onClick}>{buttonName}</Button> :
                    <Icon name='check-circle' className='w-[18px] h-[18px] text-quaternary shrink-0' />
                }
            </div>
        </div>
    )
} 