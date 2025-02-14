import { BackButton } from "@/components/shared";
import { appRoute } from "@/config/routeMgt/routePaths";
import { RecentActivities } from "./components";

export default function Activities() {
    return (
        <>
            <BackButton route={appRoute.home} label='Back to dashboard' />
            <RecentActivities isPaginated={true} />
        </>
    )
}