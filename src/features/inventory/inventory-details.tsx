import { ModuleHeader, TextBadge } from '@/components/shared';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
} from '@/components/ui';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useFetchInventoryDetails } from '@/hooks/api/mutations/inventory/useFetchInventoryDetails';
import { useNavigate, useParams } from 'react-router-dom';

const InventoryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: inventory, loading, error } = useFetchInventoryDetails(id ?? '');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!inventory) return <div>Inventory not found</div>;

  const vendorData = {
    'Basic information': {
      'Inventory ID': inventory.id,
      Type: inventory.type,
      'Date received': inventory.date_received,
      Vendor: inventory?.vendor?.first_name ? `${inventory?.vendor?.first_name} ${inventory?.vendor?.last_name}` : 'N/A',
      Material: inventory.material,
      'Material type': inventory.material_type,
      supportingText: 'Supporting text goes here',
    },
    'Specifications and details': {
      'Material state': inventory.material_state,
      Amount: inventory.amount,
      Quantity: inventory.quantity + 'kg',
      supportingText: 'Supporting text goes here',
    },
  };

  const icons: { [key: string]: string } = {
    'Inventory ID': 'hash',
    Type: 'arrow-down',
    'Date received': 'calendar',
    Vendor: 'user-left',
    Material: 'tag-03',
    'Material type': 'tag-01',
    'Material state': 'waves',
    Amount: 'bank-note',
    Quantity: 'scales',
  };

  const handleEditClick = () => {
    navigate(appRoute.add_inventory, {
      state: { type: inventory.type, inventoryData: { ...inventory, id: inventory.id } },
    });
  };

  return (
    <div>
      <button
        onClick={() => navigate(appRoute.inventory)}
        className='text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-4'
      >
        <Icon name='arrow-left' className='w-5 h-5' /> Back to Inventory
      </button>
      <div className='flex justify-between items-center mb-6'>
        <ModuleHeader title={inventory.id}>
          <div className='flex flex-row items-center gap-3'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                  <Icon name='horizontal-dots' className='w-4 h-4 text-quaternary' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='text-sm font-medium text-secondary rounded-[8px] px-1'
              >
                <DropdownMenuItem className='py-2 rounded-[8px]'>Action one</DropdownMenuItem>
                <DropdownMenuItem className='py-2 rounded-[8px]'>Action two</DropdownMenuItem>
                <DropdownMenuItem className='py-2 rounded-[8px]'>Action three</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={handleEditClick}>Edit details</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='secondary'>Generate report</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='text-sm font-medium text-secondary rounded-[8px] px-1'
              >
                <DropdownMenuItem className='py-2  rounded-[8px] justify-between'>
                  <Icon name='mail-01' className='w-4 h-4 text-quaternary' />
                  Email vendor <TextBadge text='E' />
                </DropdownMenuItem>
                <DropdownMenuItem className='py-2 rounded-[8px] justify-between'>
                  <Icon name='phone' className='w-4 h-4 text-quaternary' />
                  Call vendor <TextBadge text='C' />
                </DropdownMenuItem>
                <DropdownMenuItem className='py-2 rounded-[8px] justify-between'>
                  <Icon name='zap' className='w-4 h-4 text-quaternary' />
                  Other contact <TextBadge text='O' />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </ModuleHeader>
      </div>

      {Object.entries(vendorData).map(([sectionTitle, sectionData]) => (
        <div key={sectionTitle} className='mb-6 mt-6'>
          <h3 className='text-base font-bold text-secondary mb-2'>{sectionTitle}</h3>
          <p className='text-xs text-quaternary mb-4'>{sectionData.supportingText}</p>
          <div className='grid grid-cols-1 gap-4'>
            {Object.entries(sectionData)
              .filter(([key]) => key !== 'supportingText')
              .map(([key, value]) => (
                <div key={key} className='flex flex-col sm:flex-row gap-3 sm:items-center'>
                  <Icon name={icons[key]} className='w-4 h-4 text-quaternary hidden sm:block' />
                  <div className='flex flex-col sm:flex-row sm:items-center w-full'>
                    <p className='text-xs text-quaternary w-full sm:w-48'>{key}</p>
                    <p className='text-sm font-medium text-secondary sm:flex-1'>{value}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryDetails;
