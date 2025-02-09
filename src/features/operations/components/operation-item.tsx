import { Icon, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Operation, OperationType } from "@/types/operations"
import OperationForm from "./operation-form"

interface Props {
    operation: Operation;
    customOperations: OperationType[];
    selectedInventory: any;
    selectedOperations: any[]
}

export const OperationItem = ({ operation, customOperations, selectedInventory, selectedOperations }: Props) => {
    const handleDeleteSubOperation = (e: any) => {
        e.stopPropagation()
        alert('delate')
    }

    const handleStatusUpdate = (status: string) => {
        alert(status)
    }

    const status = [
        {
            name: 'ongoing',
        },
        {
            name: 'done',
        },
        {
            name: 'ready',
        }
    ]

    return (
        <AccordionItem value={operation.id || ''} key={operation.id}>
            <AccordionTrigger
                className='no-underline hover:no-underline focus:no-underline'
            >
                <div className='flex justify-between items-center w-full gap-x-6'>
                    <div className='flex flex-col items-start shrink-0'>
                        <p className='text-sm font-medium'>{operation.operation_type}</p>
                        <div className='flex items-center space-x-3'>
                            <p className='text-sm text-gray-500 flex items-center'>
                                <Icon name='arrow-circle-down' className='w-4 h-4 text-quaternary mr-1' />
                                {operation.input_quantity ? `${operation.input_quantity}kg` : '-'}
                            </p>
                            <p className='text-sm text-gray-500 flex items-center'>
                                <Icon name='arrow-circle-up' className='w-4 h-4 text-quaternary mr-1' />
                                {operation.quantity_produced ? `${operation.quantity_produced}kg` : '-'}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-4 mr-4 w-full'>
                        <div className='flex items-center space-x-2'>
                            <div>
                                <Icon name='dot' fill='#17B26A' className='w-2 h-2' />
                                <div className='w-[.1px] h-[14px] border ml-[3px]' />
                                <Icon name='dot' fill='#717680' className='w-2 h-2 text-quaternary' />
                            </div>
                            <div className='flex flex-col items-start space-y-1'>
                                <p className='text-sm font-medium text-primary'>
                                    {operation.start_date ? `${operation.start_date?.split('T')[0]}, ${operation.start_time}` : '-'}
                                </p>
                                <p className='text-sm text-gray-500 text-primary'>
                                    {operation.end_date ? `${operation.end_date?.split('T')[0]}, ${operation.end_time}` : '-'}
                                </p>
                            </div>
                        </div>
                        <Select
                            value={operation.status}
                            onValueChange={(value) => handleStatusUpdate(value)}
                        >
                            <SelectTrigger className="h-[22px] w-[100px]">
                                <SelectValue
                                    placeholder='Select input source'
                                    className='text-placeholder font-normal'
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {status.map((item) => (
                                    <SelectItem key={item.name} value={item.name}>
                                        <span className="capitalize text-xs">{item.name}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <button type='button' onClick={handleDeleteSubOperation}>
                            <Icon name='trash' className='w-4 h-4 text-quaternary' />
                        </button>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                    <div className='pl-3 sm:pl-6 pt-3 border-l'>
                        <OperationForm
                            customOperations={customOperations}
                            selectedInventory={selectedInventory}
                            selectedOperations={selectedOperations}
                            editingOperationId={operation?.id}
                            operation={operation}
                        />
                    </div>
            </AccordionContent>
        </AccordionItem>
    )
}