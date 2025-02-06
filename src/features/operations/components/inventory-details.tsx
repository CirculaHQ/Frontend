import { FormSection } from '@/components/shared';
import {
  Button,
  Icon,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { Inventory } from '@/hooks/api/queries/inventory';
import InventoryInfo from './inventory-info';
import { useMemo, useState } from 'react';
import { useCreateBatch } from '@/hooks/api/mutations/operations/useOperationsMutation';

interface InventoryDetailsProps {
  selectedInventory: Inventory[];
  selectedInventoryId: string[];
  onSelect: (value: string) => void;
  onDelete: (value: string) => void;
  onChange: (value: string, input: string) => void;
  data: Inventory[];
}

const InventoryDetails: React.FC<InventoryDetailsProps> = ({
  selectedInventory,
  selectedInventoryId,
  onSelect,
  onDelete,
  onChange,
  data,
}) => {
  const [collapse, setCollapse] = useState(false)
  const { mutate: createBatch, isLoading } = useCreateBatch();

  const totalQty = useMemo(() => {
    return selectedInventory.reduce((sum, item) => sum + item.quantity, 0)
  }, [selectedInventory])

  const availableQty = useMemo(() => {
    return selectedInventory.reduce((sum, item) => sum + item.quantity, 0)
  }, [selectedInventory])

  const submit = async () => {
    const payload = {
      user: selectedInventory[0].user.id,
      inventories: [],
      input_quantities: []
    } as any
    selectedInventory.map(({ id, input_quantity }) => {
      payload.inventories.push(id)
      payload.input_quantities.push(Number(input_quantity))
    })
    const data = createBatch(payload)
    console.log(data)
  }

  return (
    <FormSection title='Inventory details' description='Supporting text goes here'>
      <div className='w-full flex flex-col gap-1.5'>
        <Label>Inventory ID</Label>
        <Select onValueChange={onSelect} value=''>
          <SelectTrigger>
            <SelectValue placeholder='Select inventory' className='text-placeholder font-normal' />
          </SelectTrigger>
          <SelectContent>
            {data?.filter?.((inventory) => inventory?.type === 'in').map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!!selectedInventory.length && <p className='text-xs text-quaternary'>You can add more than one inventory record</p>}
      </div>
      {!!selectedInventory.length && !collapse && (
        <div className='w-full'>
          <p className='text-xs text-primary font-medium mb-4'>
            Total quantity: <span className='text-quaternary font-normal'>{totalQty}kg;</span> Available quantity: <span className='text-quaternary font-normal'>{availableQty}kg;</span>
          </p>
          <div className='space-y-4'>
            {selectedInventory.map((inventory) => (
              <InventoryInfo
                key={inventory.id}
                inventory={inventory}
                onChange={onChange}
                onDelete={onDelete}
                collapse={collapse}
              />
            ))}
          </div>
        </div>
      )}
      {collapse && selectedInventory.length > 0 && (
        <div className='w-full border border-[#D5D7DA] p-3 rounded-xl shadow-sm'>
          <div className='flex items-start justify-between'>
            <p className='text-sm font-medium'>{selectedInventory.length} inventories selected - 1,598kg</p>
            <div className='flex items-center'>
              <button type='button' className='px-2' onClick={() => setCollapse(false)}>
                <Icon name="chevron-selector-vertical" className='w-4 h-4 text-primary hidden sm:block' />
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedInventory.length > 1 && (
        <button
          type='button'
          className='text-sm text-brand'
          onClick={() => setCollapse(!collapse)}
        >
          {collapse ? "Expand" : "Collapse"} Items
        </button>
      )}
      <div className='w-full flex justify-start space-x-2'>
        <Button
          variant='outline'
          type='button'
          disabled={!selectedInventory.length}
          onClick={submit}
          isLoading={isLoading}
          className='w-auto'
        >
          Create batch
        </Button>
        {/* {setShowOperationInputs && (
          <Button
            type='button'
            onClick={() => setShowOperationInputs(false)}
            className='w-auto border-0'
          >
            Cancel
          </Button>
        )} */}
      </div>
    </FormSection>
  )
};

export default InventoryDetails;
