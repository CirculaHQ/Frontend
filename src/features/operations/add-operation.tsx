import { FormSection, ModuleHeader } from '@/components/shared';
import {
  Button,
  Icon,
} from '@/components/ui';
import { appRoute } from '@/config/routeMgt/routePaths';
import { OperationPayload, useAddOperation } from '@/hooks/api/mutations/operations/useAddOperation';
import { UpdateOperationPayload, useUpdateOperation } from '@/hooks/api/mutations/operations/useUpdateOperation';
import { Inventory, useFetchInventory } from '@/hooks/api/queries/inventory/useFetchInventory';
import { useFetchOperations } from '@/hooks/api/queries/operations/useFetchOperations';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { QUERYKEYS } from '@/utils/query-keys';
import { showToast } from '@/utils/toast';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import InventoryDetails from './components/inventory-details';
import OperationsList from './components/operations-list';
import { format } from 'date-fns';
import { IN, RAW } from '@/config/common';
import { useFetchOperationTypes } from '@/hooks/api/queries/operations/useOperationsQuery';
import { Batch } from '@/types/operations';

const AddOperation = () => {
  const navigate = useNavigate();
  const { userID } = useGetUserInfo();
  const queryClient = useQueryClient();

  const [selectedInventoryId, setSelectedInventoryId] = useState<string[]>([]);
  const [selectedInventory, setSelectedInventory] = useState<Inventory[]>([]);
  const [showOperationInputs, setShowOperationInputs] = useState(false);
  const [editingOperationId, setEditingOperationId] = useState<string | null>(null);
  const [batch, setBatch] = useState<Batch>({
    "id": "3ba6d2c8-db45-45b3-a804-52fb03932764",
    "created_at": "2025-02-07T08:32:26.234597Z",
    "updated_at": "2025-02-07T08:32:26.234617Z",
    "code": "OPS-250207-008",
    "operation_type": null,
    "start_date": null,
    "start_time": null,
    "end_date": null,
    "end_time": null,
    "input_quantity": 3,
    "quantity_produced": 0,
    "waste_produced": 0,
    "quantity_left": 3,
    "status": "ongoing",
    "input_quantities": [
      3
    ],
    "user": "21d755eb-af45-4a15-94a3-3b8235f62a87",
    "batch": null,
    "input_source": null,
    "inventories": [
      "64c9a83c-eac2-4718-9da7-e8645d829023"
    ]
  })

  const { mutate, isLoading } = useAddOperation();
  const { mutate: updateOperation, isLoading: isUpdating } = useUpdateOperation();
  const { data } = useFetchInventory({ stage: RAW, type: IN });
  const { data: operationsData, isLoading: operationsLoading } = useFetchOperations({ inventory_id: selectedInventoryId });
  const { data: operationTypes, isLoading: isLoadingOperationTypes } = useFetchOperationTypes()

  const formatDate = (date: string | number | Date) => format(new Date(date), 'dd/MM/yyyy');
  const formatTime = (time: any) => format(new Date(`1970/01/01T${time}:00`), 'h:mm a');

  const handleInventorySelect = (id: string) => {
    const inventoryAlreadySelected = selectedInventory.find((inventory: Inventory) => inventory.id === id)
    if (inventoryAlreadySelected) return

    const inventory = data!.results.find((inventory: Inventory) => inventory.id === id)
    if (inventory) {
      setSelectedInventoryId([...selectedInventoryId, id]);
      setSelectedInventory([...selectedInventory, { ...inventory, input_quantity: '' }])
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
    setSelectedInventoryId(selectedInventoryId.filter((inventoryId: string) => inventoryId === id));
    setSelectedInventory(updatedInventory)
  };

  const handleNewOperation = () => {
    setShowOperationInputs(true);
  };

  const handleCancelClick = () => {
    setShowOperationInputs(false);
    formik.resetForm();
  };

  const handleAccordionClick = (operation: OperationPayload) => {
    if (editingOperationId === operation.id) {
      setEditingOperationId(null);
      formik.resetForm();
    } else {
      setEditingOperationId(operation.id);
      setShowOperationInputs(true);
      formik.setValues({
        operation_type: operation.operation_type || '',
        start_date: operation.start_date ? formatDate(operation.start_date) : '',
        start_time: operation.start_time ? formatTime(operation.start_time) : '',
        end_date: operation.end_date ? formatDate(operation.end_date) : '',
        end_time: operation.end_time ? formatTime(operation.end_time) : '',
        input_quantity: operation.input_quantity || 0,
        quantity_produced: operation.quantity_produced || 0,
        waste_produced: operation.waste_produced || 0,
        input_source: operation.input_source || ''
      });
    }
  };

  const handleUpdateOperation = async (values: any) => {
    try {
      if (!editingOperationId) return;

      const payload: UpdateOperationPayload = {
        id: editingOperationId,
        operation_type: values.operation_type,
        start_date: values.start_date ? format(new Date(values.start_date), 'yyyy-MM-dd') : undefined,
        start_time: values.start_time ? format(new Date(`1970-01-01T${values.start_time}:00`), 'HH:mm:ss') : undefined,
        end_date: values.end_date ? format(new Date(values.end_date), 'yyyy-MM-dd') : undefined,
        end_time: values.end_time ? format(new Date(`1970-01-01T${values.end_time}:00`), 'HH:mm:ss') : undefined,
        input_quantity: values.input_quantity,
        quantity_produced: values.quantity_produced,
        waste_produced: values.waste_produced,

      };
      await updateOperation(payload);
      queryClient.invalidateQueries(QUERYKEYS.FETCHOPERATIONS);
      setEditingOperationId(null);
      formik.resetForm();
    } catch (error) {
      console.error('Error updating operation:', error);
    }
  };

  const handleSaveOperation = async (values: any) => {
    try {
      if (!selectedInventoryId) {
        showToast('Please select an inventory');
        return;
      }

      const payload: OperationPayload = {
        id: '',
        ...values,
        user: userID,
        inventory: selectedInventoryId,
        start_date: values.start_date ? format(new Date(values.start_date), 'yyyy-MM-dd') : undefined,
        start_time: values.start_time ? format(new Date(`1970-01-01T${values.start_time}:00`), 'HH:mm:ss') : undefined,
        end_date: values.end_date ? format(new Date(values.end_date), 'yyyy-MM-dd') : undefined,
        end_time: values.end_time ? format(new Date(`1970-01-01T${values.end_time}:00`), 'HH:mm:ss') : undefined,
      };

      await mutate(payload);
      queryClient.invalidateQueries(QUERYKEYS.FETCHOPERATIONS);
      navigate(appRoute.operations);
      formik.resetForm();
    } catch (err) {
      console.error('Error adding operation:', err);
    }
  };

  const formik = useFormik({
    initialValues: {
      input_source: '',
      operation_type: '',
      start_date: '',
      start_time: '',
      end_date: '',
      end_time: '',
      input_quantity: 0,
      quantity_produced: 0,
      waste_produced: 0,
    },

    onSubmit: async (values) => {
      if (editingOperationId) {
        await handleUpdateOperation(values);
      } else {
        await handleSaveOperation(values);
      }
    },
  });

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
        <div className='flex flex-row items-center gap-3'>
          <Button variant='outline' onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button variant='secondary' onClick={handleSaveOperation}>
            {isLoading ? 'Adding...' : 'Save operation'}
          </Button>
        </div>
      </ModuleHeader>
      <form onSubmit={formik.handleSubmit}>
        <InventoryDetails
          selectedInventory={selectedInventory}
          selectedInventoryId={selectedInventoryId}
          onDelete={handleInventoryDelete}
          onSelect={handleInventorySelect}
          onChange={handleInventoryInputChange}
          data={data?.results || []}
        />
        <FormSection title={`Operations`} description='Supporting text goes here'>
          <OperationsList
            selectedInventory={selectedInventory}
            operationsData={operationsData || { results: [] }}
            operationsLoading={operationsLoading}
            handleAccordionClick={handleAccordionClick}
            formik={formik}
            customOperations={operationTypes}
            handleUpdateOperation={handleUpdateOperation}
            isUpdating={isUpdating}
            editingOperationId={editingOperationId}
            showOperationInputs={showOperationInputs}
            setShowOperationInputs={setShowOperationInputs}
          />
          {!showOperationInputs && (
            <Button disabled={!selectedInventory.length} type='button' variant='outline' onClick={handleNewOperation}>
              New operation
            </Button>
          )}
        </FormSection>
      </form>
    </div>
  );
};

export default AddOperation;
