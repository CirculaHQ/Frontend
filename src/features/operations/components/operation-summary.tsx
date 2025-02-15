import { StatCard } from "@/components/shared";
import { Icon } from "@/components/ui";
import InventoryInfo from "./inventory-info";
import { useState } from "react";

interface Props {
    operationId?: string;
}

export default function OperationSummary({ operationId = '' }: Props) {
    const [collapse, setCollapse] = useState(false)

    const inventories: [] = []

    // const vendorData = {
    //     'Inventory details': {
    //         'Inventory ID': 'ID-47890875',
    //         'Date received': '2 November, 1989',
    //         Material: 'Plastics',
    //         'Material type': 'Polyethylene Terephthalate (PET)',
    //         supportingText: 'Supporting text goes here',
    //     },
    //     'Specifications and details': {
    //         Quantity: '500kg',
    //         'Quantity produced': '500kg',
    //         'Quantity wasted': '90kg',
    //         supportingText: 'Supporting text goes here',
    //     },
    // };

    // const icons: { [key: string]: string } = {
    //     'Inventory ID': 'hash',
    //     'Date received': 'calendar',
    //     Material: 'tag-03',
    //     'Material type': 'tag-01',
    //     Quantity: 'scales',
    //     'Quantity produced': 'scales',
    //     'Quantity wasted': 'scales',
    // };

    const specs = [
        { name: 'Input quantity', quantity: 590 },
        { name: 'Quantity produced', quantity: 590 },
        { name: 'Quantity wasted', quantity: 500 }
    ]

    return (
        <div className='space-y-6'>
            <div className="grid grid-cols-3 border rounded-lg">
                <StatCard containerClassName='p-6' label='Produced (kg)' value='0' />
                <StatCard containerClassName='p-6 border-x' label='Waste yield (kg)' value='0' />
                <StatCard containerClassName='p-6' label='Total operations' value='0' />
            </div>
            <div className="max-w-[640px]">
                <h3 className='text-base font-bold text-secondary mb-1'>Inventory details</h3>
                <p className='text-xs text-quaternary mb-4'>Supporting text goes here</p>
                <div className='grid grid-cols-1 gap-4'>
                    {!!inventories.length && !collapse && (
                        <div className='space-y-4'>
                            {inventories.map((inventory) => (
                                <InventoryInfo
                                    key={inventory.id}
                                    inventory={inventory}
                                    onChange={() => { }}
                                    onDelete={() => { }}
                                    collapse={collapse}
                                />
                            ))}
                        </div>
                    )}
                    {collapse && inventories.length > 0 && (
                        <div className='w-full border border-[#D5D7DA] p-3 rounded-xl shadow-sm'>
                            <div className='flex items-start justify-between'>
                                <p className='text-sm font-medium'>{inventories.length} inventories selected - 1,598kg</p>
                                <div className='flex items-center'>
                                    <button type='button' className='px-2' onClick={() => setCollapse(false)}>
                                        <Icon name="chevron-selector-vertical" className='w-4 h-4 text-primary hidden sm:block' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {inventories.length > 1 && (
                        <button
                            type='button'
                            className='text-sm text-brand text-start'
                            onClick={() => setCollapse(!collapse)}
                        >
                            {collapse ? "Expand" : "Collapse"} Items
                        </button>
                    )}
                </div>
            </div>
            <div className="max-w-[300px]">
                <h3 className='text-base font-bold text-secondary mb-1'>Specifications and details</h3>
                <p className='text-xs text-quaternary mb-4'>Supporting text goes here</p>
                <div className='space-y-4 text-sm'>
                    {specs.map((item) => (
                        <div className="flex justify-between">
                            <div className="flex items-center w-full">
                                <Icon name='arrow-circle-down' className='w-4 h-4 text-quaternary mr-1' />
                                <p className="text-tertiary">{item.name}</p>
                            </div>
                            <p className="font-medium text-secondary">{item.quantity}kg</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}