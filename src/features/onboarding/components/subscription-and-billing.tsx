import { useNavigate } from "react-router-dom";
import { Layout, Item } from "./layout";
import { appRoute } from "@/config/routeMgt/routePaths";

export default function SubscriptionAndBilling() {
    const navigate = useNavigate()

    return (
        <Layout
            title="Subscription and billing"
            icon="credit-card-02"
            description="Upgrade to a paid Circula plan."
            isComplete={true}
        >
            <Item
                icon="credit-card-01"
                label="Upgrade to a paid plan"
                buttonName="Upgrade"
                isComplete={false}
                onClick={() => navigate(appRoute.onboarding_plans)}
            />
        </Layout>
    )
}