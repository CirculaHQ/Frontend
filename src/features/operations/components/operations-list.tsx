import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Badge, Icon, Label } from '@/components/ui';
import OperationForm from './operation-form';
import { OperationPayload } from '@/hooks/api/mutations/operations/useAddOperation';

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
}) => {
  if (operationsLoading) {
    return <div>Loading Operations...</div>;
  }

  if (!operationsData?.results || operationsData.results.length === 0) {
    return (
      <div className='w-full flex flex-col gap-1'>
        <Label>You have not added an operation</Label>
        <p className='text-tertiary font-normal text-sm'>
          Add an operation to this inventory and they will show up here.
        </p>
      </div>
    );
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
                <div className='flex flex-col items-start '>
                  <p className='text-sm font-medium'>{operation.operation_type}</p>
                  <p className='text-sm text-gray-500'>{operation.input_quantity}</p>
                </div>
                <div className='flex items-center gap-4 mr-8'>
                  <div className='flex flex-col items-start ml-4'>
                    <p className='text-sm font-medium'>
                      {operation.start_date?.split('T')[0]}, {operation.start_time}
                    </p>
                    <p className='text-sm text-gray-500'>
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
                  formik={formik}
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
    </div>
  );
};

export default OperationsList;
