import { Accordion } from '@/components/ui/accordion';
import { Label } from '@/components/ui';
import OperationForm from './operation-form';
import { Operation, OperationType } from '@/types/operations';
import { OperationItem } from './operation-item';

interface OperationsListProps {
  operation: any;
  operationsData: Operation[];
  operationsLoading: boolean;
  customOperations: OperationType[];
  selectedInventory: any;
  selectedOperations: any[];
  showOperationInputs?: boolean;
  setShowOperationInputs: (e: any) => void;
}

const OperationsList: React.FC<OperationsListProps> = ({
  operationsData,
  operationsLoading,
  customOperations,
  selectedInventory,
  selectedOperations,
  showOperationInputs,
  setShowOperationInputs,
  operation,
}) => {

  if (operationsLoading) {
    return <div>Loading Operations...</div>;
  }

  if ((!showOperationInputs && operationsData?.length === 0 && !selectedOperations?.length)) {
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
        {operationsData?.map((operation) => (
          <OperationItem
            key={operation.id}
            operation={operation}
            selectedInventory={selectedInventory}
            customOperations={customOperations}
            selectedOperations={selectedOperations}
          />
        ))}
      </Accordion>
      {showOperationInputs && (
        <div className='mt-5'>
          <OperationForm
            //formik={formik}
            customOperations={customOperations}
            selectedInventory={selectedInventory}
            onCancel={setShowOperationInputs}
            operation={operation}
            selectedOperations={selectedOperations}
          />
        </div>
      )}
    </div>
  );
};

export default OperationsList;
