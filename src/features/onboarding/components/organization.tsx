import { User } from "@/types/user";
import { Layout, Item } from "./layout";

interface Props {
    user: User;
}

export default function Organization({ user }: Readonly<Props>) {
    return (
        <Layout
            title="Organization"
            icon="building-06"
            description="Add information about your organization to your account."
            isComplete={false}
        >
            <>
                <Item
                    icon="text-input"
                    label="Add your Organization name"
                    buttonName="Add Name"
                    isComplete={!!user.organization}
                    onClick={() => { }}
                />
                <Item
                    icon="image-plus"
                    label="Upload an image for your Organization"
                    buttonName="Upload Image"
                    isComplete={!!user.company_logo}
                    onClick={() => { }}
                />
                <Item
                    icon="marker-pin-01"
                    label="Upload your location"
                    buttonName="Add Location"
                    isComplete={false}
                    onClick={() => { }}
                />
            </>
        </Layout>
    )
}