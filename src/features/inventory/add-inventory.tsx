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
  DatePicker,
  SelectSeparator,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useAddInventory, useUpdateInventory } from '@/hooks/api/mutations/inventory';
import { useFetchMaterials, useFetchMaterialState, useFetchMaterialTypes } from '@/hooks/api/queries/inventory';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AddInventory = () => {
  const updateInventory = useUpdateInventory();
  const addInventory = useAddInventory();
  const { userID } = useGetUserInfo();
  const navigate = useNavigate();
  const location = useLocation();
  const inventoryType = location.state?.type || 'in';
  const inventoryDataToEdit = location.state?.inventoryData;
  const isEditMode = !!inventoryDataToEdit;

  const formik = useFormik({
    initialValues: {
      type: inventoryType,
      date_received: '',
      vendor: '',
      customer: '',
      material: '',
      material_type: '',
      material_state: '',
      currency: 'USD',
      amount: '',
      quantity: '',
      user: userID,
    },
    onSubmit: async (values) => {
      if (isEditMode) {
        await updateInventory.mutateAsync(
          {
            ...values,
            quantity: Number(values.quantity),
            id: inventoryDataToEdit.id,
          },
          {
            onSuccess: () => {
              navigate(appRoute.inventory_details(inventoryDataToEdit.id).path);
            },
          }
        );
      } else {
        await addInventory.mutateAsync(
          {
            ...values,
            quantity: Number(values.quantity),
          },
          {
            onSuccess: (response) => {
              const { id } = response as unknown as { id: string };
              navigate(appRoute.inventory_details(id).path);
            },
          }
        );
      }
    },
  });

  const getMaterialId = (material: string) => {
    return materials?.find((item) => item.name === material)?.id ?? ''
  }

  const { data: materials, isLoading: isLoadingMaterials } = useFetchMaterials()
  const { data: materialTypes, isLoading: isLoadingMaterialTypes } = useFetchMaterialTypes(getMaterialId(inventoryDataToEdit.material || formik.values.material))
  const { data: materialState, isLoading: isLoadingMaterialState } = useFetchMaterialState()

  useEffect(() => {
    if (isEditMode && inventoryDataToEdit) {
      formik.setValues({
        type: inventoryDataToEdit.type || inventoryType,
        date_received: inventoryDataToEdit.date_received || '',
        vendor: inventoryDataToEdit.vendor || '',
        customer: inventoryDataToEdit.customer || '',
        material: inventoryDataToEdit.material || '',
        material_type: inventoryDataToEdit.material_type || '',
        material_state: inventoryDataToEdit.material_state || '',
        currency: inventoryDataToEdit.currency || 'USD',
        amount: inventoryDataToEdit.amount || '',
        quantity: inventoryDataToEdit.quantity || '',
        user: userID,
      });
    }
  }, [isEditMode, inventoryDataToEdit, userID, inventoryType, materialTypes]);

  return (
    <div className='mx-auto'>
      <button
        onClick={() => navigate(appRoute.inventory)}
        className='text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-4'
      >
        <Icon name='arrow-left' className='w-5 h-5' /> Back to inventory
      </button>
      <ModuleHeader
        title={inventoryType === 'in' ? 'Inventory In' : 'Inventory Out'}
        description={
          inventoryType === 'in'
            ? 'Log a new item in your inventory.'
            : 'Log an item out of your inventory'
        }
        className='mb-10'
      >
        <div className='flex flex-row items-center gap-3'>
          <Button variant='outline' onClick={() => navigate(appRoute.inventory)}>
            Cancel
          </Button>
          <Button variant='secondary'>Add to inventory</Button>
        </div>
      </ModuleHeader>

      <form onSubmit={formik.handleSubmit}>
        <FormSection title={`Basic information`} description='Supporting text goes here'>
          <div className='w-full'>
            <Label className='mb-1.5'>Date received</Label>
            <DatePicker
              date={formik.values.date_received ? new Date(formik.values.date_received) : undefined} // Initialize with Formik value if available
              onDateChange={(newDate) => {
                const formattedDate = newDate ? newDate.toISOString().split('T')[0] : ''; // Format to yyyy-MM-dd
                formik.setFieldValue('date_received', formattedDate);
              }}
              placeholder='Select a date'
            />
          </div>

          {inventoryType === 'in' && (
            <div className='w-full flex flex-col gap-1.5'>
              <Label>Vendor</Label>
              <Select
                value={formik.values.vendor}
                onValueChange={(value) => formik.setFieldValue('vendor', value)}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder='Select vendor'
                    className='text-placeholder font-normal'
                  />
                </SelectTrigger>
                <SelectContent>
                  {/* {vendors.map((vendor) => (
                  <SelectItem key={vendor.id} value={vendor.id}>
                    <div className='flex flex-row items-center gap-2 justify-start'>
                      <Avatar className='w-6 h-6 rounded-full'>
                        <AvatarImage src={vendor.avatar} />
                        <AvatarFallback>{vendor.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className='text-sm text-primary'>{vendor.name}</span>
                    </div>
                  </SelectItem>
                ))} */}
                  <SelectItem value='James Hopper'>
                    <div className='flex flex-row items-center gap-2 justify-start'>
                      <Avatar className='w-6 h-6 rounded-full'>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className='text-sm text-primary'>James Hopper</span>
                    </div>
                  </SelectItem>
                  <SelectItem value='2d77d70f-17e2-40af-a258-673b5d422e0f'>John Doe</SelectItem>
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
          )}

          {inventoryType === 'out' && (
            <div className='w-full flex flex-col gap-1.5'>
              <Label>Customer</Label>
              <Select
                value={formik.values.customer}
                onValueChange={(value) => formik.setFieldValue('customer', value)}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder='Select customer'
                    className='text-placeholder font-normal'
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='James Hopper'>
                    <div className='flex flex-row items-center gap-2 justify-start'>
                      <Avatar className='w-6 h-6 rounded-full'>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className='text-sm text-primary'>James Hopper</span>
                    </div>
                  </SelectItem>
                  <SelectItem value='2d77d70f-17e2-40af-a258-673b5d422e0f'>John Doe</SelectItem>
                  <SelectSeparator />
                  <div className='text-tertiary font-normal text-sm px-4 py-2'>
                    Can't find customer?
                  </div>
                  <div
                    onClick={() => navigate(`${appRoute.add_vendor}?type=business`)}
                    className='px-4 py-2 flex flex-row items-center justify-between'
                  >
                    <div className='flex flex-row items-center gap-2'>
                      <Icon name='user-right' className='w-5 h-5' />
                      <span className='text-sm text-primary font-medium'>
                        Add new business customer
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
                        Add new individual customer
                      </span>
                    </div>
                    <Icon name='chevron-right' className='w-5 h-5' />
                  </div>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className='w-full flex flex-col gap-1.5'>
            <Label>Material</Label>
            <Select
              value={formik.values.material}
              onValueChange={(value) => {
                formik.setFieldValue('material', value);
                //setSelectedMaterial(value);
              }}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder='Select the material'
                  className='text-placeholder font-normal'
                />
              </SelectTrigger>
              <SelectContent loading={isLoadingMaterials}>
                {materials?.map((material) => (
                  <SelectItem key={material.name} value={material.name}>
                    {material.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='w-full flex flex-col gap-1.5'>
            <Label>Material type</Label>
            <Select
              value={formik.values.material_type}
              onValueChange={(value) => formik.setFieldValue('material_type', value)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder='Select the material type'
                  className='text-placeholder font-normal'
                />
              </SelectTrigger>
              <SelectContent loading={isLoadingMaterialTypes}>
                {materialTypes?.map((type) => (
                  <SelectItem key={type.name} value={type.name}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </FormSection>

        <FormSection title={`Specifications and details`} description='Supporting text goes here'>
          <div className='w-full flex flex-col gap-1.5'>
            <Label>Material state</Label>
            <Select
              value={formik.values.material_state}
              onValueChange={(value) => formik.setFieldValue('material_state', value)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder='Select the material type'
                  className='text-placeholder font-normal'
                />
              </SelectTrigger>
              <SelectContent loading={isLoadingMaterialState}>
                {materialState?.map((state) => (
                  <SelectItem key={state.name} value={state.name}>
                    {state.name}
                  </SelectItem>
                ))}
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
            errorMessage={
              typeof formik.errors.amount === 'string' && formik.touched.amount
                ? formik.errors.amount
                : undefined
            }
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
              typeof formik.errors.quantity === 'string' && formik.touched.quantity
                ? formik.errors.quantity
                : undefined
            }
          />
        </FormSection>

        <div className='flex justify-end gap-4 mt-8'>
          <Button variant='outline' onClick={() => navigate(appRoute.inventory)}>
            Cancel
          </Button>
          <Button type='submit' variant='secondary'>
            {isEditMode ? 'Save Changes' : 'Add to Inventory'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddInventory;
