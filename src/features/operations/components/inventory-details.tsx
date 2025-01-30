import { FormSection } from '@/components/shared';
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import InventoryInfo from './inventory-info';

interface InventoryDetailsProps {
  selectedInventory: any;
  selectedInventoryId: string | null;
  onSelect: (value: string) => void;
  data?: { results: { id: string }[] };
}

const InventoryDetails: React.FC<InventoryDetailsProps> = ({
  selectedInventory,
  selectedInventoryId,
  onSelect,
  data,
}) => (
  <FormSection title='Inventory details' description='Supporting text goes here'>
    <div className='w-full flex flex-col gap-1.5'>
      <Label>Inventory ID</Label>
      <Select onValueChange={onSelect} value={selectedInventoryId || ''}>
        <SelectTrigger>
          <SelectValue placeholder='Select inventory' className='text-placeholder font-normal' />
        </SelectTrigger>
        <SelectContent>
          {data?.results?.map((item: { id: string }) => (
            <SelectItem key={item.id} value={item.id}>
              {item.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    {selectedInventory && <InventoryInfo selectedInventory={selectedInventory} />}
  </FormSection>
);

export default InventoryDetails;
