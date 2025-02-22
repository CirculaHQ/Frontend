import { PageLoader } from '@/components/loaders';
import { BackButton, FormSection, ModuleHeader, SelectFile } from '@/components/shared';
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
} from '@/components/ui';
import { ROLE_IN_VALUE_CHAIN } from '@/config/common';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useAddVendor, useEditVendor } from '@/hooks/api/mutations/contacts';
import { useFetchVendor } from '@/hooks/api/queries/contacts';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { countries, states } from '@/mocks';
import { BUSINESS, INDIVIDUAL } from '@/types';
import { Customer } from '@/types/customers';
import { uploadToCloudinary } from '@/utils/cloudinary-helper';
import { AddCustomerSchema } from '@/validation-schema/contact';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const formatDate = (date: string | number | Date) => format(new Date(date), 'yyyy-MM-dd');

const AddVendor = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userID } = useGetUserInfo();
  const vendorId = searchParams.get('id') as string;
  const accountType = searchParams.get('type') as string || INDIVIDUAL;

  const { mutateAsync: addVendor, isLoading: isAddingVendor } = useAddVendor();
  const { mutateAsync: editVendor, isLoading: isEditingVendor } = useEditVendor();
  const { data, isLoading: isLoadingVendor } = useFetchVendor(vendorId);

  const isBusiness = vendorId ? (data?.type === BUSINESS) : (accountType === BUSINESS);

  const button = {
    loading: vendorId ? isEditingVendor : isAddingVendor,
    name: vendorId ? 'Save' : 'Add',
  };

  const [state, setState] = useState({
    selectedFile: null,
    preview: '',
    isUploading: false,
  });

  const formik = useFormik({
    initialValues: {
      business_name: '',
      phone_number: '',
      email: '',
      lga: '',
      account_number: '',
      account_name: '',
      first_name: '',
      last_name: '',
      nickname: '',
      state: '',
      bank_name: '',
      country: '',
      role_in_value_chain: '',
      notes: '',
      address: '',
      date_of_birth: ''
    },
    validationSchema: isBusiness ? AddCustomerSchema.Business : AddCustomerSchema.Individual,
    onSubmit: async (values) => {
      let payload = {
        ...values,
        type: accountType,
        user: userID,
        date_of_birth: values.date_of_birth || null
      } as Customer;

      if (state.selectedFile) {
        setState({ ...state, isUploading: true });
        const res = await uploadToCloudinary(state.selectedFile);
        if ('secure_url' in res) {
          payload.photo = res?.secure_url;
        }
        setState({ ...state, isUploading: false });
      }

      if (!vendorId) {
        const res = await addVendor(payload);
        navigate(appRoute.vendorDetails(res?.id).path)
      } else {
        await editVendor({ vendorId, payload });
        navigate(appRoute.vendorDetails(vendorId).path)
      }
    },
  });

  const selectImage = (e: any) => {
    const { file, preview } = e;
    setState({ ...state, selectedFile: file, preview });
  };

  useEffect(() => {
    if (vendorId && data) {
      formik.setValues({
        business_name: data.business_name ?? '',
        phone_number: data.phone_number ?? '',
        email: data.email ?? '',
        lga: data.lga ?? '',
        account_number: data.account_number ?? '',
        account_name: data.account_name ?? '',
        first_name: data.first_name ?? '',
        last_name: data.last_name ?? '',
        nickname: data.nickname ?? '',
        state: data.state ?? '',
        bank_name: data.bank_name ?? '',
        country: data.country ?? '',
        role_in_value_chain: data.role_in_value_chain ?? '',
        notes: data.notes ?? '',
        address: data.address ?? '',
        date_of_birth: data?.date_of_birth ? formatDate(data.date_of_birth) : '',
      });
    }
  }, [vendorId, data]);

  const renderButton = () => (
    <>
      <Button
        disabled={button.loading || state.isUploading}
        type='button'
        variant='outline'
        onClick={() => navigate(appRoute.vendors)}
      >
        Cancel
      </Button>
      <Button
        disabled={button.loading || state.isUploading}
        type='submit'
        variant='secondary'
        isLoading={button.loading || state.isUploading}
      >
        {button.name} vendor
      </Button>
    </>
  )

  if (isLoadingVendor) return <PageLoader />;

  return (
    <div className='mx-auto'>
      <BackButton route={appRoute.vendors} label='Back to vendors' />
      <ModuleHeader title={`${vendorId ? 'Edit' : 'Add'} ${isBusiness ? 'business' : 'individual'} vendor`} className='mb-10'>
        <div className='flex flex-row items-center gap-3'>
          {renderButton()}
        </div>
      </ModuleHeader>
      <form onSubmit={formik.handleSubmit}>
        <FormSection
          title={`${isBusiness ? 'Business' : 'Personal'} Information`}
          description='Supporting text goes here'
        >
          <div className='flex flex-col gap-2'>
            <Label>
              {isBusiness ? 'Business Logo' : 'Image'}{' '}
              <span className='text-quaternary'>(Optional)</span>
            </Label>
            <div className='flex items-center gap-4'>
              <div className='bg-white p-[3px] rounded-2xl shadow-md'>
                <div className='bg-[#F5F5F5] rounded-2xl w-[72px] h-[72px] border border-[#D5D7DA] flex flex-col items-center justify-center'>
                  {!data?.photo && !state.selectedFile ? (
                    <Icon name='persona' className='w-9 h-9' />
                  ) : (
                    <img
                      src={state.preview || data?.photo}
                      alt='pics'
                      width={72}
                      height={72}
                      className='object-cover object-top w-[72px] h-[72px] rounded-2xl'
                    />
                  )}
                </div>
              </div>
              <div className='flex flex-col'>
                <SelectFile onSelect={selectImage} fileTypes='image/png, image/jpg' />
                <p className='text-xs text-gray-500'>
                  .png, .jpg, files up to 2MB. Recommended size is 128x128px.
                </p>
              </div>
            </div>
          </div>
          {!isBusiness && (
            <div className='flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4 w-full'>
              <Input
                id='first-name'
                type='text'
                placeholder='e.g. John'
                label='First name'
                name='first_name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
                errorMessage={
                  formik.errors.first_name && formik.touched.first_name ? formik.errors.first_name : ''
                }
              />
              <Input
                id='last-name'
                type='text'
                placeholder='e.g. Doe'
                label='Last name'
                name='last_name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
                errorMessage={
                  formik.errors.last_name && formik.touched.last_name ? formik.errors.last_name : ''
                }
              />
            </div>
          )}
          {!isBusiness && (
            <div className='w-full'>
              <Input
                id='nick-name'
                type='text'
                placeholder='e.g. Johnny'
                label='Nickname (Optional)'
                name='nickname'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nickname}
                errorMessage={
                  formik.errors.nickname && formik.touched.nickname ? formik.errors.nickname : ''
                }
              />
              <span className='text-tertiary font-normal text-sm mt-1.5'>
                A personal name to help differentiate this vendor from others.
              </span>
            </div>
          )}
          {isBusiness && (
            <Input
              id='business-name'
              type='text'
              placeholder='e.g. Circula'
              label='Business name'
              name='business_name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.business_name}
              errorMessage={
                formik.errors.business_name && formik.touched.business_name
                  ? formik.errors.business_name
                  : ''
              }
            />
          )}
          {!isBusiness && (
            <div className='w-full'>
              <Label className='mb-1.5'>Date of birth</Label>
              <DatePicker
                date={formik.values.date_of_birth ? new Date(formik.values.date_of_birth) : undefined}
                onDateChange={(date) => {
                  const formattedDate = date ? formatDate(date) : '';
                  formik.setFieldValue('date_of_birth', formattedDate);
                }}
              />
            </div>
          )}
          <Input
            id='phone-number'
            type='text'
            placeholder='NG +2348012345678'
            label='Phone number'
            name='phone_number'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone_number}
            errorMessage={
              formik.errors.phone_number && formik.touched.phone_number
                ? formik.errors.phone_number
                : ''
            }
          />
          <Input
            id='email'
            type='email'
            placeholder='johndoe@circulahq.com'
            label='Email address'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            errorMessage={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
          />
          <div className='w-full flex flex-col gap-1.5'>
            <Label>Role in value chain</Label>
            <Select
              value={formik.values.role_in_value_chain}
              onValueChange={(value) => formik.setFieldValue('role_in_value_chain', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select role' className='text-placeholder font-normal' />
              </SelectTrigger>
              <SelectContent>
                {ROLE_IN_VALUE_CHAIN.map((item) => (
                  <SelectItem key={item.name} value={item.value} className='capitalize'>{item.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </FormSection>
        <FormSection
          title={`${isBusiness ? 'Business' : 'Personal'} Address`}
          description='Supporting text goes here'
        >
          <div className='w-full flex flex-col gap-1.5'>
            <Label>Country</Label>
            <Select
              value={formik.values.country}
              onValueChange={(value) => formik.setFieldValue('country', value)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder='Select country'
                  className='text-placeholder font-normal'
                />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.label} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Textarea
            id='address'
            label='Address'
            placeholder='Your address'
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          <Input
            id='lga'
            type='text'
            placeholder='Your L.G.A'
            label='L.G.A'
            name='lga'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lga}
            errorMessage={formik.errors.lga && formik.touched.lga ? formik.errors.lga : ''}
          />
          <div className='w-full flex flex-col gap-1.5'>
            <Label>State</Label>
            <Select
              value={formik.values.state}
              onValueChange={(value) => formik.setFieldValue('state', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select state' className='text-placeholder font-normal' />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.label} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </FormSection>
        <FormSection title='Bank Details' description='Supporting text goes here'>
          <Input
            id='bank-name'
            type='text'
            placeholder='e.g. Access Bank'
            label='Bank name'
            name='bank_name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bank_name}
            errorMessage={
              formik.errors.bank_name && formik.touched.bank_name ? formik.errors.bank_name : ''
            }
          />
          <Input
            id='account-number'
            type='text'
            placeholder='e.g. 0000000000'
            label='Account number'
            name='account_number'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.account_number}
            errorMessage={
              formik.errors.account_number && formik.touched.account_number
                ? formik.errors.account_number
                : ''
            }
          />
          <Input
            id='account-name'
            type='text'
            placeholder='e.g. Circula'
            label='Account name'
            name='account_name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.account_name}
            errorMessage={
              formik.errors.account_name && formik.touched.account_name
                ? formik.errors.account_name
                : ''
            }
          />
          <Textarea
            id='notes'
            placeholder='SWIFT code, Routing number, etc.'
            label='Additional notes (Optional)'
            onChange={formik.handleChange}
            value={formik.values.notes}
          />
        </FormSection>
        <div className='flex justify-end gap-4 mt-8'>
          {renderButton()}
        </div>
      </form>
    </div>
  );
};

export default AddVendor;
