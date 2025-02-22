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
} from '@/components/ui';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useFormik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AddVendor = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const type = searchParams.get('type');
  const isBusiness = type === 'business';

  const formik = useFormik({
    initialValues: {
      businessName: '',
      phoneNumber: '',
      email: '',
      lga: '',
      accountNumber: '',
      accountName: '',
      firstName: '',
      lastName: '',
      nickname: '',
    },
    onSubmit: (values) => {},
  });

  return (
    <div className='md:p-6 mx-auto'>
      <button
        onClick={() => navigate(appRoute.vendors)}
        className='text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-4'
      >
        <Icon name='arrow-left' className='w-5 h-5' /> Back to customers
      </button>
      <ModuleHeader title={`Add ${isBusiness ? 'Business' : 'Individual'} Vendor`} className='mb-10'>
        <div className='flex flex-row items-center gap-3'>
          <Button variant='outline' onClick={() => navigate(appRoute.vendors)}>
            Cancel
          </Button>
          <Button variant='secondary'>Add vendor</Button>
        </div>
      </ModuleHeader>

      <form>
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
                  <Icon name='persona' className='w-9 h-9' />
                </div>
              </div>

              <div className='flex flex-col'>
                <Button className='w-fit mb-1'>Upload image</Button>
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
                name='firstName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                errorMessage={
                  formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : ''
                }
              />

              <Input
                id='last-name'
                type='text'
                placeholder='e.g. Doe'
                label='Last name'
                name='lastName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                errorMessage={
                  formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : ''
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
                label='Nickname(Optional)'
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
              name='businessName'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.businessName}
              errorMessage={
                formik.errors.businessName && formik.touched.businessName
                  ? formik.errors.businessName
                  : ''
              }
            />
          )}

          {!isBusiness && (
            <div className='w-full'>
              <Label className='mb-1.5'>Date of birth</Label>
              <DatePicker />
            </div>
          )}
          <Input
            id='phone-number'
            type='text'
            placeholder='NG +2348012345678'
            label='Phone number'
            name='phoneNumber'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            errorMessage={
              formik.errors.phoneNumber && formik.touched.phoneNumber
                ? formik.errors.phoneNumber
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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select role' className='text-placeholder font-normal' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='m@example.com'>Supplier</SelectItem>
                <SelectItem value='m@google.com'>Retailer</SelectItem>
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
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder='Select country'
                  className='text-placeholder font-normal'
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='m@example.com'>Nigeria</SelectItem>
                <SelectItem value='m@google.com'>Ghana</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Textarea label='Address' placeholder='Your address' />

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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select state' className='text-placeholder font-normal' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='m@example.com'>Lagos</SelectItem>
                <SelectItem value='m@google.com'>Abuja</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </FormSection>

        <FormSection title='Bank Details' description='Supporting text goes here'>
          <div className='w-full flex flex-col gap-1.5'>
            <Label>Bank name</Label>
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder='Select your bank name'
                  className='text-placeholder font-normal'
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='m@example.com'>First Bank</SelectItem>
                <SelectItem value='m@google.com'>GT Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            id='account-number'
            type='text'
            placeholder='e.g. 0000000000'
            label='Account number'
            name='accountNumber'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.accountNumber}
            errorMessage={
              formik.errors.accountNumber && formik.touched.accountNumber
                ? formik.errors.accountNumber
                : ''
            }
          />

          <Input
            id='account-name'
            type='text'
            placeholder='e.g. Circula'
            label='Account name'
            name='accountName'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.accountName}
            errorMessage={
              formik.errors.accountName && formik.touched.accountName
                ? formik.errors.accountName
                : ''
            }
          />

          <Textarea
            id='notes'
            placeholder='SWIFT code, Routing number, etc.'
            label='Additional notes (Optional)'
          />
        </FormSection>

        <div className='flex justify-end gap-4 mt-8'>
          <Button variant='outline' onClick={() => navigate(appRoute.vendors)}>
            Cancel
          </Button>
          <Button type='submit' variant='secondary' onClick={() => navigate(appRoute.vendor_details)}>
            Add vendor
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddVendor;
