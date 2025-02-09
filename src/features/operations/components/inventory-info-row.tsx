import { Icon, Input } from "@/components/ui";

interface InfoRowProps {
    label: string;
    value?: string | number;
    icon: string;
    showInput?: boolean;
    inventory?: any;
    onChange?: (id: string, value: string) => void;
}

export const InfoRow = ({ label, value, icon, inventory, onChange, showInput = false }: InfoRowProps) => (
    <div className='flex flex-col sm:flex-row gap-3 sm:items-center'>
        <Icon name={icon} className='w-4 h-4 text-quaternary hidden sm:block' />
        <div className='flex flex-col sm:flex-row sm:items-center w-full'>
            <p className='text-xs text-quaternary w-full sm:w-48'>{label}</p>
            {!showInput ?
                <p className='text-xs text-quaternary sm:flex-1 capitalize'>{value}</p> :
                (onChange && <Input
                    id='input_quantity'
                    type='text'
                    placeholder='0'
                    label=''
                    name='input_quantity'
                    tag={`/${inventory.quantity_left || inventory.quantity}kg`}
                    onChange={(e) => {
                        const { value } = e.target
                        if (isNaN(Number(value))) return;
                        if (Number(value) > inventory.quantity) return
                        onChange(inventory.id, value)
                    }}
                    //onBlur=''
                    value={inventory.input_quantity}
                    containerClassName='flex-1'
                    className='flex-1'
                //errorMessage={false}
                />
                )
            }
        </div>
    </div>
);