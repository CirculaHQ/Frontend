import { Icon } from '@/components/ui';

interface Inventory {
  material: string;
  material_type: string;
  quantity: number;
}

const InventoryInfo = ({ selectedInventory }: { selectedInventory: Inventory }) => (
  <div className='w-full mb-2 border border-[#D5D7DA] p-3 rounded-xl shadow-sm'>
    <div className='grid grid-cols-1 gap-4'>
      <InfoRow label='Material' value={selectedInventory.material} icon='tag-03' />
      <InfoRow label='Material type' value={selectedInventory.material_type} icon='tag-01' />
      <InfoRow label='Quantity' value={`${selectedInventory.quantity}Kg`} icon='scales' />
    </div>
  </div>
);

interface InfoRowProps {
  label: string;
  value: string;
  icon: string;
}

const InfoRow = ({ label, value, icon }: InfoRowProps) => (
  <div className='flex flex-col sm:flex-row gap-3 sm:items-center'>
    <Icon name={icon} className='w-4 h-4 text-quaternary hidden sm:block' />
    <div className='flex flex-col sm:flex-row sm:items-center w-full'>
      <p className='text-xs text-quaternary w-full sm:w-48'>{label}</p>
      <p className='text-xs text-quaternary sm:flex-1'>{value}</p>
    </div>
  </div>
);

export default InventoryInfo;
