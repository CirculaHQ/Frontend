import { User } from "@/types/user";
import { Layout, Item } from "./layout";

interface Props {
    user: User;
}

export default function Personal({ user }: Readonly<Props>) {
    return (
        <Layout
            title="Personal"
            icon="user-01"
            description="Tell us more about yourself"
            isComplete={false}
        >
            <>
                <Item
                    icon="image-plus"
                    label="Upload a profile picture"
                    buttonName="Upload Image"
                    isComplete={!!user.picture}
                    onClick={() => { }}
                />
                <Item
                    icon="phone-01"
                    label="Add your phone number"
                    buttonName="Add Phone"
                    isComplete={!!user.phone}
                    onClick={() => { }}
                />
                <Item
                    icon="building-08"
                    label="Add your bank account"
                    buttonName="Add Account"
                    isComplete={!!user?.accounts?.length}
                    onClick={() => { }}
                />
            </>
        </Layout>
    )
}