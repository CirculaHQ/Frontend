import { Layout, Item } from "./layout";

export default function ImportData() {
    return (
        <Layout
            title="Import existing data"
            icon="file-05"
            description="Pick up from where you left off with your previous app"
            isComplete={true}
        >
            <>
                <Item
                    icon="download-01"
                    label="Download our sample file to get started."
                    buttonName="Download sample.csv"
                    isComplete={false}
                    onClick={() => { }}
                />
                <Item
                    icon="download-01"
                    label="Import your data"
                    buttonName="Add File"
                    isComplete={false}
                    onClick={() => { }}
                />
            </>
        </Layout>
    )
}