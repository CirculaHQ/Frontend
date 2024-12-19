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

const AddInventory = () => {
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
        <Icon name='arrow-left' className='w-5 h-5' /> Back to inventory
      </button>
      <ModuleHeader
        title={`Inventory in`}
        description='Log a new item in your inventory.'
        className='mb-10'
      >
        <div className='flex flex-row items-center gap-3'>
          <Button variant='outline' onClick={() => navigate(appRoute.vendors)}>
            Cancel
          </Button>
          <Button variant='secondary'>Add to inventory</Button>
        </div>
      </ModuleHeader>

      <form>
        <FormSection title={`Basic information`} description='Supporting text goes here'>
          <div className='w-full'>
            <Label className='mb-1.5'>Date received</Label>
            <DatePicker />
          </div>

          <div className='w-full flex flex-col gap-1.5'>
            <Label>Vendor</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select vendor' className='text-placeholder font-normal' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='m@example.com'>
                  <div className='flex flex-row items-center gap-2 justify-start'>
                    <Avatar className='w-6 h-6 rounded-full'>
                      <AvatarImage src='https://github.com/shadcn.png' />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className='text-sm text-primary'>James Hopper</span>
                  </div>
                </SelectItem>
                <SelectItem value='m@google.com'>Daniel Johnson</SelectItem>
                <SelectSeparator />
                <div className='text-tertiary font-normal text-sm px-4 py-2'>
                  Can't find vendor?
                </div>
                <div
                  onClick={() => navigate(`${appRoute.add_vendor}?type=business`)}
                  className='px-4 py-2 flex flex-row items-center justify-between'
                >
                  <div className='flex flex-row items-center gap-2'>
                    <Icon name='user-right' className='w-5 h-5' />
                    <span className='text-sm text-primary font-medium'>
                      Add new business vendor
                    </span>
                  </div>
                  <Icon name='chevron-right' className='w-5 h-5' />
                </div>

                <div
                  onClick={() => navigate(`${appRoute.add_vendor}?type=business`)}
                  className='px-4 py-2 flex flex-row items-center justify-between'
                >
                  <div className='flex flex-row items-center gap-2'>
                    <Icon name='user-right' className='w-5 h-5' />
                    <span className='text-sm text-primary font-medium'>
                      Add new individual vendor
                    </span>
                  </div>
                  <Icon name='chevron-right' className='w-5 h-5' />
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className='w-full flex flex-col gap-1.5'>
            <Label>Material </Label>
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder='Select the material'
                  className='text-placeholder font-normal'
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='m@example.com'>Plastic</SelectItem>
                <SelectItem value='m@google.com'>Glass</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='w-full flex flex-col gap-1.5'>
            <Label>Material type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder='Select the material type'
                  className='text-placeholder font-normal'
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='m@example.com'>Polyethene</SelectItem>
                <SelectItem value='m@google.com'>Glass</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </FormSection>

        <FormSection title={`Specifications and details`} description='Supporting text goes here'>
          <div className='w-full flex flex-col gap-1.5'>
            <Label>Material state</Label>
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder='Select the material type'
                  className='text-placeholder font-normal'
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='m@example.com'>Liquid</SelectItem>
                <SelectItem value='m@google.com'>Solid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            id='amount'
            type='text'
            placeholder='$ 2000'
            label='Amount'
            name='amount'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
            errorMessage={formik.errors.amount && formik.touched.amount ? formik.errors.amount : ''}
          />

          <Input
            id='quantity'
            type='text'
            placeholder='500'
            label='Quantity'
            name='quantity'
            onChange={formik.handleChange}
            tag='kg'
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
            errorMessage={
              formik.errors.quantity && formik.touched.quantity ? formik.errors.quantity : ''
            }
          />
        </FormSection>

        <div className='flex justify-end gap-4 mt-8'>
          <Button variant='outline' onClick={() => navigate(appRoute.vendors)}>
            Cancel
          </Button>
          <Button type='submit' variant='secondary'>
            Add to inventory
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddInventory;
