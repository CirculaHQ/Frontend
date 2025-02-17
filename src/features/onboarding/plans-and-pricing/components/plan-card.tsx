import { Button, Icon } from "@/components/ui";

interface Props {
    title: string;
    amount: string;
    caption: string;
}

export default function PlanCard({ title, amount, caption }: Props) {
    return (
        <div className="border rounded-lg p-8 space-y-8 bg-[#FAFAFA]">
            <div className="space-y-1">
                <p className="text-sm text-primary">{title}</p>
                <h3 className="text-xl text-primary font-semibold">{amount}</h3>
                <p className="text-xs text-tertiary">{caption}</p>
            </div>
            <ul className="space-y-3">
                <li>
                    <Icon name='check-circle' className='w-[14.5px] h-[14.5px] text-quaternary inline mr-1' /> 1 user
                </li>
                <li>
                    <Icon name='check-circle' className='w-[14.5px] h-[14.5px] text-quaternary inline mr-1' /> 50 contacts
                </li>
                <li>
                    <Icon name='check-circle' className='w-[14.5px] h-[14.5px] text-quaternary inline mr-1' /> Email and live chat support
                </li>
                <li>
                    <Icon name='x-circle' className='w-[14.5px] h-[14.5px] text-quaternary inline mr-1' /> Export reports
                </li>
            </ul>
            <Button variant='brand' className="w-full">
                Subscribe
            </Button>
        </div>
    )
}