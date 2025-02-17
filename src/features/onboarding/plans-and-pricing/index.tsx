import { BackButton, ModuleHeader } from "@/components/shared";
import { Button } from "@/components/ui";
import { appRoute } from "@/config/routeMgt/routePaths";
import { PlanCard } from "./components";
import { useNavigate } from "react-router-dom";

export default function PlansAndPricing() {
    const navigate = useNavigate()

    const plans = [
        {
            name: 'Standard',
            amount: 25000,
            caption: 'per month, billed month'
        },
        {
            name: 'Premium',
            amount: 25000,
            caption: 'per month, billed month'
        },
        {
            name: 'Enterprise',
            amount: 'Custom',
            caption: 'A plan based on your specific needs'
        },
    ]

    return (
        <div>
            <BackButton route={appRoute.onboarding} label='Onboarding' />
            <ModuleHeader
                title="Product plans and pricing"
                description="You are currently on a 14 day free trial."
            >
                <Button onClick={() => navigate(appRoute.onboarding)}>
                    Cancel
                </Button>
            </ModuleHeader>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                <PlanCard
                    title="Standard"
                    amount={`₦${(25000).toLocaleString(undefined, { maximumSignificantDigits: 2, minimumSignificantDigits: 2 })}`}
                    caption="per month, billed monthly"
                />
                <PlanCard
                    title="Standard"
                    amount={`₦${(25000).toLocaleString(undefined, { maximumSignificantDigits: 2, minimumSignificantDigits: 2 })}`}
                    caption="per month, billed monthly"
                />
                <PlanCard
                    title="Enterprise"
                    amount="Custom"
                    caption="A plan based on your specific needs"
                />
            </div>
            <div className="mt-10">
                <h3 className='text-lg font-bold text-secondary mb-1'>Compare plans</h3>
                <p className='text-sm text-quaternary mb-4'>More information about our plans to help you make the best decision.</p>
                <div className="mt-10 overflow-x-auto">
                    <table>
                        <thead>
                            <th className="w-full"></th>
                            {plans.map((plan) => (
                                <th>
                                    <div className="w-[232px] px-1">
                                        <div className="space-y-1 text-start mb-6">
                                            <p className="text-sm text-primary font-normal">{plan.name}</p>
                                            <h3 className="text-xl text-primary font-semibold">{isNaN(plan.amount) ? plan.amount : `₦${plan.amount.toLocaleString()}`}</h3>
                                        </div>
                                        <Button variant='brand' className="w-full">
                                            Subscribe
                                        </Button>
                                    </div>
                                </th>
                            ))}
                        </thead>
                        <tbody>
                            <tr className="text-base font-semibold text-primary">
                                <td className="pt-10">General</td>
                                </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}