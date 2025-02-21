import { BackButton, ModuleHeader } from "@/components/shared";
import { Button, Icon, TableCell, TableRow } from "@/components/ui";
import { appRoute } from "@/config/routeMgt/routePaths";
import { PlanCard } from "./components";
import { useNavigate } from "react-router-dom";
import { useFetchSubscriptionPlans } from "@/hooks/api/queries/settings/useSubscriptionPlans";
import { PageLoader } from "@/components/loaders";

export default function PlansAndPricing() {
    const navigate = useNavigate()
    const { data, isLoading } = useFetchSubscriptionPlans({})

    const plans = data ? data.results : []

    if (isLoading) return <PageLoader />;

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
                {plans?.map((plan) => (
                    <PlanCard
                        key={plan.id}
                        title={plan.name}
                        plan={plan}
                        amount={Number(plan.price_per_month) ?
                            `₦${Number(plan.price_per_month)
                                .toLocaleString(undefined, {
                                    maximumSignificantDigits: 2, minimumSignificantDigits: 2
                                })}` : 'Custom'
                        }
                        caption={Number(plan.price_per_month) ? 'per month, billed monthly' : 'A plan based on your specific needs'}
                    />)
                )}
            </div>
            <div className="mt-10">
                <h3 className='text-lg font-bold text-secondary mb-1'>Compare plans</h3>
                <p className='text-sm text-quaternary mb-4'>More information about our plans to help you make the best decision.</p>
                <div className="mt-10 overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th className="w-full"></th>
                                {plans?.map((plan) => (
                                    <th key={plan.name}>
                                        <div className="w-[232px] px-1">
                                            <div className="space-y-1 text-start mb-6">
                                                <p className="text-sm text-primary font-normal">{plan.name}</p>
                                                <h3 className="text-xl text-primary font-semibold">{!Number(plan.price_per_month) ? 'Custom' : `₦${Number(plan.price_per_month).toLocaleString()}`}</h3>
                                            </div>
                                            <Button variant='brand' className="w-full">
                                                Subscribe
                                            </Button>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="text-base font-semibold text-primary">
                                <td className="pt-10 pb-5">General</td>
                            </tr>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>Number of users</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start`}>
                                            <Icon
                                                name='check-circle'
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1'
                                            />
                                            <p>{item?.number_of_users}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>Number of contacts</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start`}>
                                            <Icon
                                                name='check-circle'
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1'
                                            />
                                            <p>{item?.number_of_contacts}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>Sustainability report</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start ${item?.sustainability_report ? '' : 'text-quaternary'}`}>
                                            <Icon
                                                name={item?.sustainability_report ? 'check-circle' : 'x-circle'}
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1' />
                                            <p>{item?.sustainability_report || 'No reports'}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>Customer support</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start `}>
                                            <Icon
                                                name={item?.customer_support ? 'check-circle' : 'x-circle'}
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1' />
                                            <p>{item?.customer_support}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>Export reports</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start ${item?.export_reports ? '' : 'text-quaternary'}`}>
                                            <Icon
                                                name={item?.export_reports ? 'check-circle' : 'x-circle'}
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1' />
                                            <p>{item?.export_reports ? 'Included' : 'Not included'}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>

                            <tr className="text-base font-semibold text-primary">
                                <td className="pt-10 pb-5">Operations</td>
                            </tr>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>Number of operations</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start`}>
                                            <Icon
                                                name={item?.number_of_operations ? 'check-circle' : 'x-circle'}
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1' />
                                            <p>{item?.number_of_operations}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>KPI & target setting</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start ${item?.kpi_target_setting ? '' : 'text-quaternary'}`}>
                                            <Icon
                                                name={item?.kpi_target_setting ? 'check-circle' : 'x-circle'}
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1' />
                                            <p>{item?.kpi_target_setting ? 'Included' : 'Not included'}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>

                            <tr className="text-base font-semibold text-primary">
                                <td className="pt-10 pb-5">Inventory</td>
                            </tr>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>Material distribution</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start ${item?.material_distribution ? '' : 'text-quaternary'}`}>
                                            <Icon
                                                name={item?.material_distribution ? 'check-circle' : 'x-circle'}
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1' />
                                            <p>{item?.material_distribution}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>Material types</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start ${item?.number_of_material_types ? '' : 'text-quaternary'}`}>
                                            <Icon
                                                name={item?.number_of_material_types ? 'check-circle' : 'x-circle'}
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1' />
                                            <p>{item?.number_of_material_types}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>Inventory classification</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start ${item?.inventory_classification ? '' : 'text-quaternary'}`}>
                                            <Icon
                                                name={item?.inventory_classification ? 'check-circle' : 'x-circle'}
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1' />
                                            <p>{item?.inventory_classification}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>

                            <tr className="text-base font-semibold text-primary">
                                <td className="pt-10 pb-5">Sales</td>
                            </tr>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>Currency</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start ${item?.currency ? '' : 'text-quaternary'}`}>
                                            <Icon
                                                name={item?.currency ? 'check-circle' : 'x-circle'}
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1' />
                                            <p>{item?.currency}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>Invoices (per month)</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start ${item?.number_of_invoices ? '' : 'text-quaternary'}`}>
                                            <Icon
                                                name={item?.number_of_invoices ? 'check-circle' : 'x-circle'}
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1' />
                                            <p>{item?.number_of_invoices}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>Overdue notification</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start ${item?.overdue_notification ? '' : 'text-quaternary'}`}>
                                            <Icon
                                                name={item?.overdue_notification ? 'check-circle' : 'x-circle'}
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1' />
                                            <p>{item?.overdue_notification ? 'Included' : 'Not included'}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>Tax and discounts</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start ${item?.tax_discount ? '' : 'text-quaternary'}`}>
                                            <Icon
                                                name={item?.tax_discount ? 'check-circle' : 'x-circle'}
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1' />
                                            <p>{item?.tax_discount ? 'Included' : 'Not included'}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className='w-full text-secondary align-top'>Recurring sales</TableCell>
                                {plans.map((item) => (
                                    <TableCell key={item.id} className='w-[232px] align-top'>
                                        <div className={`flex items-start ${item?.recurring ? '' : 'text-quaternary'}`}>
                                            <Icon
                                                name={item?.recurring ? 'check-circle' : 'x-circle'}
                                                className='shrink-0 w-[14.5px] h-[14.5px] text-quaternary mr-1 mt-1' />
                                            <p>{item?.recurring ? 'Included' : 'Not included'}</p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}