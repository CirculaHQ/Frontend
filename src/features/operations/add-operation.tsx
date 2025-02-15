import { FormSection, ModuleHeader } from '@/components/shared';
import {
  Button,
  Icon,
} from '@/components/ui';
import { appRoute } from '@/config/routeMgt/routePaths';
import { Inventory, useFetchInventory } from '@/hooks/api/queries/inventory/useFetchInventory';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InventoryDetails from './components/inventory-details';
import OperationsList from './components/operations-list';
import { IN, RAW } from '@/config/common';
import { useFetchOperation, useFetchOperationsByBatch, useFetchOperationTypes } from '@/hooks/api/queries/operations/useOperationsQuery';
import { matchInventories } from '@/utils/inventory';

const AddOperation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const operationId = searchParams.get('operationId') ?? ''

  //const [selectedInventoryId, setSelectedInventoryId] = useState<string[]>([]);
  const [selectedInventory, setSelectedInventory] = useState<Inventory[]>([]);
  const [selectedOperations, setSelectedOperations] = useState<any[]>([]);
  const [showOperationInputs, setShowOperationInputs] = useState(false);

  const { data: inventories } = useFetchInventory({ stage: RAW, type: IN });
  const { data: operationsByBatch, isLoading: isLoadingOperationsByBatch } = useFetchOperationsByBatch(operationId);
  const { data: operation, isLoading: isLoadingOperation } = useFetchOperation(operationId);
  const { data: operationTypes, isLoading: isLoadingOperationTypes } = useFetchOperationTypes()

  const handleInventorySelect = (id: string) => {
    const inventoryAlreadySelected = selectedInventory.find((inventory: Inventory) => inventory.id === id)
    if (inventoryAlreadySelected) return

    const inventory = inventories!.results.find((inventory: Inventory) => inventory.id === id)
    if (inventory) {
      //setSelectedInventoryId([...selectedInventoryId, id]);
      setSelectedInventory([...selectedInventory, { ...inventory, input_quantity: inventory.quantity_left || inventory.quantity }])
    }
  };

  const handleInventoryInputChange = (id: string, input_quantity: string) => {
    const updatedInventory = selectedInventory.map((inventory: Inventory) => {
      if (inventory.id === id) {
        return { ...inventory, input_quantity }
      }
      return inventory
    })
    setSelectedInventory(updatedInventory)
  };

  const handleInventoryDelete = (id: string) => {
    const updatedInventory = selectedInventory.filter((inventory: Inventory) => inventory.id !== id)
    //setSelectedInventoryId(selectedInventoryId.filter((inventoryId: string) => inventoryId === id));
    setSelectedInventory(updatedInventory)
  };

  const handleNewOperation = () => {
    setShowOperationInputs(true);
  };

  useEffect(() => {
    if (operationId && operation && inventories?.results) {
      const op = matchInventories(operation, inventories?.results)
      setSelectedInventory(op)
      if (operationsByBatch?.results.length) setSelectedOperations(operationsByBatch?.results)
    }
  }, [operationId, inventories, operation])

  useEffect(() => {
    if (operationsByBatch?.results?.length) setSelectedOperations(operationsByBatch?.results)
  }, [operationsByBatch?.results])

  if (operationId && isLoadingOperation) return <>Loading resources...</>

  return (
    <div className='mx-auto'>
      <button
        onClick={() => navigate(appRoute.operations)}
        className='text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-4'
      >
        <Icon name='arrow-left' className='w-5 h-5' /> Back to Operations
      </button>
      <ModuleHeader
        title={`New operation`}
        description='Update operations on your inventory as you perform them'
        className='mb-10'
      >
        {/* <div className='flex flex-row items-center gap-3'>
          <Button variant='outline' onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button variant='secondary' onClick={handleSaveOperation}>
            {isLoading ? 'Adding...' : 'Save operation'}
          </Button>
        </div> */}
      </ModuleHeader>
      <div>
        <InventoryDetails
          selectedInventory={selectedInventory}
          //selectedInventoryId={selectedInventoryId}
          onDelete={handleInventoryDelete}
          onSelect={handleInventorySelect}
          onChange={handleInventoryInputChange}
          data={inventories?.results || []}
        />
        <FormSection title={`Operations`} description='Supporting text goes here'>
          <OperationsList
            selectedInventory={selectedInventory}
            selectedOperations={selectedOperations}
            operationsData={selectedOperations}
            operation={operation}
            operationsLoading={isLoadingOperationsByBatch}
            customOperations={operationTypes || []}
            showOperationInputs={showOperationInputs}
            setShowOperationInputs={setShowOperationInputs}
          />
          {!showOperationInputs && (
            <Button disabled={!operation} type='button' variant='outline' onClick={handleNewOperation}>
              New operation
            </Button>
          )}
        </FormSection>
      </div>
    </div>
  );
};

export default AddOperation;
