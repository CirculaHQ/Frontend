import { Layout, Item } from "./layout";

export default function Organization() {
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
                    isComplete={false}
                    onClick={() => { }}
                />
                <Item
                    icon="image-plus"
                    label="Upload an image for your Organization"
                    buttonName="Upload Image"
                    isComplete={false}
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