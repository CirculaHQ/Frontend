import { User } from "@/types/user";
import { Layout, Item } from "./layout";

interface Props {
    user: User;
}

export default function OperationsAndMaterials({ user }: Props) {
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
                    isComplete={!!user?.commodities?.length}
                    onClick={() => { }}
                />
            </>
        </Layout>
    )
}