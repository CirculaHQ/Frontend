import { Accordion } from "@/components/ui/accordion";
import { ImportData, OperationsAndMaterials, Organization, Personal } from "./components";
import SubscriptionAndBilling from "./components/subscription-and-billing";
import { PageLoader } from "@/components/loaders";
import { useFetchUserProfile } from "@/hooks/api/queries/settings/useUser";

export default function Onboarding() {
    const { data: user, isLoading } = useFetchUserProfile()

    if (isLoading) return <PageLoader />;
    if(!user) return <p>Something went wrong</p>

    return (
        <div className="max-w-[720px]">
            <h1 className="text-lg font-semibold text-primary">Welcome to Circula!</h1>
            <p className="text-base text-tertiary">Let’s set up your Circula experience with these steps below.</p>
            <div className="mt-8 sm:mt-10">
                <Accordion type='multiple' className='w-full space-y-4'>
                    <Organization user={user} />
                    <Personal user={user} />
                    <OperationsAndMaterials user={user} />
                    <ImportData />
                    <SubscriptionAndBilling />
                </Accordion>
            </div>
        </div>
    )
}