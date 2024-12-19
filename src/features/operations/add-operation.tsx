import { FormSection, ModuleHeader } from '@/components/shared';
import {
  Button,
  Icon,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  DatePicker,
  SelectSeparator,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useFormik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AddOperation = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      businessName: '',
      phoneNumber: '',
      email: '',
      amount: '',
      quantity: '',
    },
    onSubmit: (values) => {},
  });

  return (
    <div className='md:p-6 mx-auto'>
      <button
        onClick={() => navigate(appRoute.vendors)}
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
          <Button variant='outline' onClick={() => navigate(appRoute.operations)}>
            Cancel
          </Button>
          <Button variant='outline' onClick={() => navigate(appRoute.operations)}>
            Save
          </Button>
          <Button variant='secondary'>Add operation</Button>
        </div>
      </ModuleHeader>

      <form>
        <FormSection title={`Inventory details`} description='Supporting text goes here'>
          <div className='w-full flex flex-col gap-1.5'>
            <Label>Inventory ID</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select vendor' className='text-placeholder font-normal' />
              </SelectTrigger>
              <SelectContent>
               
                <SelectItem value='m@google.com'>INV 043</SelectItem>
                <SelectItem value='m@google.com'>INV 083</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </FormSection>

        <FormSection title={`Operations`} description='Supporting text goes here'>
          <div className='w-full flex flex-col gap-1'>
            <Label>You have not added an operation</Label>
            <p className='text-tertiary font-normal text-sm'>Add an operation to this inventory and they will show up here.</p>
          </div>
          <Button variant='outline' onClick={() => navigate(appRoute.vendors)}>
            Add operation
          </Button>
        </FormSection>

      </form>
    </div>
  );
};

export default AddOperation;
