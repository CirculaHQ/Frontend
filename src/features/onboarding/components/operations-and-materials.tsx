import { Layout, Item } from "./layout";

export default function OperationsAndMaterials() {
    return (
        <Layout
            title="Operations and materials"
            icon="settings-04"
            description="Save your custom operations and materials"
            isComplete={false}
        >
            <>
                <Item
                    icon="zap-circle"
                    label="Add a custom operation"
                    buttonName="Add Operation"
                    isComplete={false}
                    onClick={() => { }}
                />
                <Item
                    icon="dotpoints"
                    label="Add a custom material"
                    buttonName="Add Material"
                    isComplete={false}
                    onClick={() => { }}
                />
            </>
        </Layout>
    )
}