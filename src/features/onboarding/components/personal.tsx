import { Layout, Item } from "./layout";

export default function Personal() {
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
                    isComplete={false}
                    onClick={() => { }}
                />
                <Item
                    icon="phone-01"
                    label="Add your phone number"
                    buttonName="Add Phone"
                    isComplete={false}
                    onClick={() => { }}
                />
                <Item
                    icon="building-08"
                    label="Add your bank account"
                    buttonName="Add Account"
                    isComplete={false}
                    onClick={() => { }}
                />
            </>
        </Layout>
    )
}