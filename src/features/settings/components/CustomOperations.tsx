import { FormSection } from '@/components/shared';
import { Button, Icon, Input } from '@/components/ui';
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { CustomOperation } from '@/hooks/api/mutations/settings/custom-operation';

interface CustomOperationsProps {
  customOperations: CustomOperation[];
  handleEditOperation: (operation: CustomOperation) => void;
  setEditingOperation: (operation: any) => void;
  handleDeleteOperation: (id: string) => void;
  showAddOperationInput: boolean;
  setShowAddOperationInput: (value: boolean) => void;
  operationFormik: any;
  editingOperation: CustomOperation | null;
}

const CustomOperations: React.FC<CustomOperationsProps> = ({
  customOperations,
  handleEditOperation,
  handleDeleteOperation,
  showAddOperationInput,
  setShowAddOperationInput,
  setEditingOperation,
  operationFormik,
  editingOperation,
}) => {
  return (
    <FormSection title='Custom operations' description='Supporting text goes here'>
      {customOperations.length === 0 ? (
        <div>
          <h2 className='text-sm text-secondary font-semibold'>No Custom Operation added</h2>
          <p className='text-sm text-tertiary font-normal'>
            Add a custom operation to your account and they will show up here
          </p>
        </div>
      ) : (
        <div className='w-full divide-y'>
          {customOperations.map((operation) => (
            <div
              className='grid grid-cols-[1fr_auto] gap-4 items-center w-full py-4'
              key={operation.id}
            >
              <div className='flex flex-col gap-0.5'>
                <p className='text-sm font-medium'>{operation.name}</p>
              </div>
              <div className='flex items-center justify-end gap-4'>
                <div className='flex flex-col gap-0.5 text-right'>
                  <p
                    className='text-xs text-gray-500 cursor-pointer hover:text-gray-700'
                    onClick={() => handleEditOperation(operation)}
                  >
                    Edit
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <p className='text-xs text-gray-500 cursor-pointer hover:text-gray-700'>
                      Delete
                    </p>
                  </DialogTrigger>
                  <DialogContent>
                    <Icon name='trash-03' className='w-10 h-10 mb-4' />
                    <DialogHeader>
                      <DialogTitle>Delete custom operation</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete {operation.name} from your operation list?
                        You cannot undo this action.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className='flex flex-col sm:flex-row sm:justify-end sm:space-x-2 w-full'>
                      <Button variant='outline' className='flex-1'>
                        Cancel
                      </Button>
                      <Button
                        variant='secondary'
                        className='flex-1'
                        onClick={() => handleDeleteOperation(operation.id)}
                      >
                        Delete item
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddOperationInput && (
        <form onSubmit={operationFormik.handleSubmit}>
          <div className='flex flex-col gap-2'>
            <Input
              id='custom-operation-name'
              type='text'
              placeholder='Custom operation name'
              name='name'
              className='mb-2'
              value={operationFormik.values.name}
              onChange={operationFormik.handleChange}
            />
          </div>
          <div className='mt-2 flex items-center gap-2'>
            <Button type='submit' variant='outline'>
              {editingOperation ? 'Update Operation' : 'Save Operation'}
            </Button>
            <Button
              type='button'
              variant='ghost'
              onClick={() => {
                setShowAddOperationInput(false);
                operationFormik.resetForm();
                setEditingOperation(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {!showAddOperationInput && (
        <div className='mt-2 flex items-center gap-2'>
          <Button variant='outline' onClick={() => setShowAddOperationInput(true)}>
            Add operation
          </Button>
        </div>
      )}
    </FormSection>
  );
};

export default CustomOperations;
