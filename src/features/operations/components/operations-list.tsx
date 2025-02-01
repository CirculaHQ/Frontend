import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Badge, Icon, Label } from '@/components/ui';
import OperationForm from './operation-form';
import { OperationPayload } from '@/hooks/api/mutations/operations/useAddOperation';
import { useState } from 'react';

interface OperationsListProps {
  operationsData: { results: OperationPayload[] };
  operationsLoading: boolean;
  handleAccordionClick: (operation: OperationPayload) => void;
  formik: any;
  customOperations: any;
  handleUpdateOperation: (operation: OperationPayload) => void;
  isUpdating: boolean;
  selectedInventory: any;
  editingOperationId: string | null;
  showOperationInputs?: boolean;
  setShowOperationInputs: (e: any) => void;
}

const OperationsList: React.FC<OperationsListProps> = ({
  operationsData,
  operationsLoading,
  handleAccordionClick,
  formik,
  customOperations,
  handleUpdateOperation,
  isUpdating,
  selectedInventory,
  editingOperationId,
  showOperationInputs,
  setShowOperationInputs
}) => {
  const [addedOperations, setAddedOperations] = useState<any[]>([])

  if (operationsLoading) {
    return <div>Loading Operations...</div>;
  }

  if ((!showOperationInputs && operationsData.results.length === 0 && !addedOperations.length)) {
    return (
      <div className='w-full flex flex-col gap-1'>
        <Label>You have not added an operation</Label>
        <p className='text-tertiary font-normal text-sm'>
          Add an operation to this inventory and they will show up here.
        </p>
      </div>
    );
  }

  const handleDeleteOperation = (id: string) => {
    const updatedOperation = addedOperations.filter((item) => item.id !== id)
    setAddedOperations(updatedOperation)
  }

  return (
    <div className='w-full'>
      <Accordion type='multiple' className='w-full'>
        {operationsData.results.map((operation) => (
          <AccordionItem value={operation.id || ''} key={operation.id}>
            <AccordionTrigger
              className='no-underline hover:no-underline focus:no-underline'
              onClick={() => handleAccordionClick(operation)}
            >
              <div className='flex justify-between items-center w-full'>
                <div className='flex flex-col items-start'>
                  <p className='text-sm font-medium'>{operation.operation_type}</p>
                  <div className='flex items-center space-x-3'>
                    <p className='text-sm text-gray-500 flex items-center'>
                      <Icon name='arrow-circle-down' className='w-4 h-4 text-quaternary mr-1' />
                      {operation.input_quantity}kg
                    </p>
                    <p className='text-sm text-gray-500 flex items-center'>
                      <Icon name='arrow-circle-down' className='w-4 h-4 text-quaternary mr-1' />
                      357kg
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-4 mr-8'>
                  <div className='flex flex-col items-start ml-4'>
                    <p className='text-sm font-medium text-primary'>
                      {operation.start_date?.split('T')[0]}, {operation.start_time}
                    </p>
                    <p className='text-sm text-gray-500 text-primary'>
                      {operation.end_date?.split('T')[0]}, {operation.end_time}
                    </p>
                  </div>
                  <div className='flex flex-col items-start ml-4'>
                    <Badge
                      variant={operation.end_date && operation.end_time ? 'success' : 'overdue'}
                    >
                      {operation.end_date && operation.end_time ? 'Done' : 'Pending'}
                    </Badge>
                  </div>
                  <Icon name='trash' className='w-4 h-4 text-quaternary' />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {editingOperationId === operation.id && (
                <OperationForm
                  //formik={formik}
                  addedOperations={addedOperations}
                  setAddedOperations={setAddedOperations}
                  customOperations={customOperations}
                  handleUpdateOperation={handleUpdateOperation}
                  isUpdating={isUpdating}
                  selectedInventory={selectedInventory}
                  editingOperationId={editingOperationId}
                />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
        {addedOperations.map((operation) => (
          <AccordionItem value={operation.id || ''} key={operation.id}>
            <AccordionTrigger
              className='no-underline hover:no-underline focus:no-underline'
              onClick={() => handleAccordionClick(operation)}
            >
              <div className='flex justify-between items-center w-full'>
                <div className='flex flex-col items-start'>
                  <p className='text-sm font-medium'>{operation.operation_type}</p>
                  <div className='flex items-center space-x-3'>
                    <p className='text-sm text-gray-500 flex items-center'>
                      <Icon name='arrow-circle-down' className='w-4 h-4 text-quaternary mr-1' />
                      {operation.input_quantity}kg
                    </p>
                    <p className='text-sm text-gray-500 flex items-center'>
                      <Icon name='arrow-circle-down' className='w-4 h-4 text-quaternary mr-1' />
                      357kg
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-4 mr-8'>
                  <div className='flex flex-col items-start ml-4'>
                    <p className='text-sm font-medium text-primary'>
                      {operation.start_date?.split('T')[0]}, {operation.start_time}
                    </p>
                    <p className='text-sm text-gray-500 text-primary'>
                      {operation.end_date?.split('T')[0]}, {operation.end_time}
                    </p>
                  </div>
                  <div className='flex flex-col items-start ml-4'>
                    <Badge
                      variant={operation.end_date && operation.end_time ? 'success' : 'overdue'}
                    >
                      {operation.end_date && operation.end_time ? 'Done' : 'Pending'}
                    </Badge>
                  </div>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteOperation(operation.id)
                    }}
                  >
                    <Icon name='trash' className='w-4 h-4 text-quaternary' />
                  </button>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {editingOperationId === operation.id && (
                <OperationForm
                  //formik={formik}
                  addedOperations={addedOperations}
                  setAddedOperations={setAddedOperations}
                  customOperations={customOperations}
                  handleUpdateOperation={handleUpdateOperation}
                  isUpdating={isUpdating}
                  selectedInventory={selectedInventory}
                  editingOperationId={editingOperationId}
                />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {showOperationInputs && (
        <div className='mt-5'>
        <OperationForm
          //formik={formik}
          customOperations={customOperations}
          handleUpdateOperation={handleUpdateOperation}
          isUpdating={false}
          selectedInventory={selectedInventory}
          editingOperationId={editingOperationId}
          addedOperations={addedOperations}
          setAddedOperations={setAddedOperations}
          setShowOperationInputs={setShowOperationInputs}
        />
        </div>
      )}
    </div>
  );
};

export default OperationsList;
