import {
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Label,
  Input,
  DatePicker,
} from '@/components/ui';
import { format } from 'date-fns';

import { FormikProps } from 'formik';

interface Operation {
  id: string;
  name: string;
}

interface OperationFormProps {
  formik: FormikProps<any>;
  customOperations: Operation[];
  handleUpdateOperation: (values: any) => void;
  isUpdating: boolean;
  selectedInventory: any;
  editingOperationId: string | null;
}

const formatDate = (date: string | number | Date) => format(new Date(date), 'dd/MM/yyyy');
const formatTime = (time: any) => format(new Date(`1970-01-01T${time}:00`), 'h:mm a');

const OperationForm: React.FC<OperationFormProps> = ({
  formik,
  customOperations,
  handleUpdateOperation,
  isUpdating,
  selectedInventory,
  editingOperationId,
}) => {
  return (
    <form onSubmit={formik.handleSubmit} className='w-full flex flex-col gap-4'>
      <div className='w-full flex flex-col gap-2'>
        <Label>Operation type</Label>
        <Select
          value={formik.values.operation_type}
          onValueChange={(value) => formik.setFieldValue('operation_type', value)}
        >
          <SelectTrigger>
            <SelectValue
              placeholder='Select operation type'
              className='text-placeholder font-normal'
            />
          </SelectTrigger>
          <SelectContent>
            {customOperations.map((operation) => (
              <SelectItem key={operation.id} value={operation.name}>
                {operation.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4'>
        <div className='w-full'>
          <Label>Date started</Label>
          <DatePicker
            date={formik.values.start_date ? new Date(formik.values.start_date) : undefined}
            onDateChange={(date) => {
              const formattedDate = date ? formatDate(date) : '';
              formik.setFieldValue('start_date', formattedDate);
            }}
          />
        </div>
        <div className='w-full'>
          <Label>Time started</Label>
          <Input
            id='start_time'
            type='time'
            placeholder='e.g. 08:00 AM'
            name='start_time'
            value={formik.values.start_time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>
      <div className='w-full relative'>
        <Label htmlFor='quantity' className='mb-1 block'>
          Input quantity
        </Label>
        <div className='relative flex items-center'>
          <Input
            id='input_quantity'
            type='number'
            placeholder='0'
            name='input_quantity'
            value={formik.values.input_quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='pr-16'
          />
          {selectedInventory && (
            <span className='absolute right-3 text-gray-500'>/{selectedInventory.quantity}Kg</span>
          )}
        </div>
      </div>

      <p className='text-tertiary font-normal text-sm'>
        Fill this section after the operation is completed
      </p>

      <div className='w-full flex flex-col md:flex-row gap-4'>
        <div className='w-full'>
          <Label>Date finished</Label>
          <DatePicker
            date={formik.values.end_date ? new Date(formik.values.end_date) : undefined}
            onDateChange={(date) => {
              const formattedDate = date ? formatDate(date) : '';
              formik.setFieldValue('end_date', formattedDate);
            }}
          />
        </div>
        <div className='w-full'>
          <Label>Time finished</Label>
          <Input
            id='end_time'
            type='time'
            placeholder='e.g. 05:30 PM'
            name='end_time'
            value={formik.values.end_time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>

      <div className='w-full relative'>
        <Label htmlFor='quantity_produced' className='mb-1 block'>
          Quantity produced
        </Label>
        <div className='relative flex items-center'>
          <Input
            id='quantity_produced'
            type='number'
            placeholder='0'
            name='quantity_produced'
            className='pr-16'
            value={formik.values.quantity_produced}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className='absolute right-3 text-gray-500'>kg</span>
        </div>
      </div>
      <div className='w-full relative'>
        <Label htmlFor='waste_produced' className='mb-1 block'>
          Waste produced
        </Label>
        <div className='relative flex items-center'>
          <Input
            id='waste_produced'
            type='number'
            placeholder='0'
            name='waste_produced'
            className='pr-16'
            value={formik.values.waste_produced}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className='absolute right-4 text-gray-500'>kg</span>
        </div>
      </div>

      <div className='w-full flex justify-start'>
        <Button
          variant='outline'
          type='submit'
          onClick={() => handleUpdateOperation(formik.values)}
          className='w-auto'
        >
          {isUpdating ? 'Updating...' : editingOperationId ? 'Update Operation' : 'Add Operation'}
        </Button>
      </div>
    </form>
  );
};

export default OperationForm;
