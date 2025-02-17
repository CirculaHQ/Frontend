import { Accordion } from "@/components/ui/accordion";
import { ImportData, OperationsAndMaterials, Organization, Personal } from "./components";
import SubscriptionAndBilling from "./components/subscription-and-billing";

export default function Onboarding() {
    return (
        <div className="max-w-[720px]">
            <h1 className="text-lg font-semibold text-primary">Welcome to Circula!</h1>
            <p className="text-base text-tertiary">Let’s set up your Circula experience with these steps below.</p>
            <div className="mt-8 sm:mt-10">
                <Accordion type='multiple' className='w-full space-y-4'>
                    <Organization />
                    <Personal />
                    <OperationsAndMaterials />
                    <ImportData />
                    <SubscriptionAndBilling />
                </Accordion>
            </div>
        </div>
    )
}