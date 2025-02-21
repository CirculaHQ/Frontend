import { Button, Icon } from "@/components/ui";
import { SubscriptionPlan } from "@/types/plans";

interface Props {
    title: string;
    amount: string;
    caption: string;
    plan: SubscriptionPlan;
}

export default function PlanCard({ title, amount, caption, plan }: Readonly<Props>) {
    return (
        <div className="flex flex-col justify-between border rounded-lg p-8 space-y-8 bg-[#FAFAFA]">
            <div className="space-y-8">
                <div className="space-y-1">
                    <p className="text-sm text-primary">{title}</p>
                    <h3 className="text-xl text-primary font-semibold">{amount}</h3>
                    <p className="text-xs text-tertiary">{caption}</p>
                </div>
                <ul className="space-y-3 text-sm text-tertiary">
                    <li className="flex items-start">
                        <Icon name='check-circle' className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary inline mr-1 mt-1' />
                        <p>{plan.number_of_users} user</p>
                    </li>
                    <li className="flex items-start">
                        <Icon name='check-circle' className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary inline mr-1 mt-1' />
                        <p>{plan.number_of_contacts} contacts</p>
                    </li>
                    <li className="flex items-start">
                        <Icon name='check-circle' className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary inline mr-1 mt-1' />
                        <p>{plan.customer_support}</p>
                    </li>
                    <li className="flex items-start">
                        <Icon name={plan.export_reports ? 'check-circle' : 'x-circle'} className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary inline mr-1 mt-1' />
                        <p>Export reports</p>
                    </li>
                </ul>
            </div>
            <Button variant='brand' className="w-full">
                Subscribe
            </Button>
        </div>
    )
}