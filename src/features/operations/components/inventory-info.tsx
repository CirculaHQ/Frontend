import { Icon } from '@/components/ui';
import { Inventory } from '@/hooks/api/queries/inventory';
import { useState } from 'react';
import { InfoRow } from './inventory-info-row';

interface InventoryInfoProps {
  inventory: Inventory;
  onDelete: (value: string) => void;
  onChange: (value: string, input: string) => void;
  collapse?: boolean;
}

const InventoryInfo = ({ inventory, onChange, onDelete, collapse = false }: InventoryInfoProps) => {
  const [show, setShow] = useState(true)

  return (
    <div className='w-full border border-[#D5D7DA] p-3 rounded-xl shadow-sm'>
      <div className='flex items-start justify-between'>
        <p className='text-sm font-medium'>{inventory.code}</p>
        <div className='flex items-center'>
          <button type='button' className='px-2' onClick={() => onDelete(inventory.id)}>
            <Icon name='trash' className='w-4 h-4 text-quaternary' />
          </button>
          <button type='button' className='px-2' onClick={() => setShow(!show)}>
            {show ?
              <Icon name="chevron-up" className='w-4 h-4 text-white hidden sm:block' /> :
              <Icon name="chevron-down" className='w-4 h-4 text-primary hidden sm:block' />
            }
          </button>
        </div>
      </div>
      {(show && !collapse) && (
        <div className='grid grid-cols-1 gap-4 mt-4'>
          <InfoRow label='Material' value={inventory.material} icon='tag-03' />
          <InfoRow label='Material type' value={inventory.material_type} icon='tag-01' />
          <InfoRow label='Material state' value={inventory.material_state} icon='waves' />
          <InfoRow label='Input quantity' onChange={onChange} inventory={inventory} value={inventory.quantity} icon='scales' showInput={true} />
        </div>
      )}
    </div>
  )
};

export default InventoryInfo;
