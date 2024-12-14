import { ModuleHeader } from '@/components/shared';
import { Button } from '@/components/ui';
import { appRoute } from '@/config/routeMgt/routePaths';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => {
  return (
    <div className='mb-10 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8'>
      {/* Section Header */}
      <div>
        <h3 className='text-lg font-semibold mb-2'>{title}</h3>
        <p className='text-sm text-gray-500'>{description}</p>
      </div>

      {/* Section Content */}
      <div>{children}</div>
    </div>
  );
};

const AddBusinessVendor = () => {
  const navigate = useNavigate();

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      <button
        onClick={() => navigate(appRoute.vendors)}
        className='text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-4'
      >
        <span>&lt;</span> Back to customers
      </button>
      <ModuleHeader title='Add Business Vendor' className='mb-6'>
        <div className='flex flex-row items-center gap-3'>
          <Button variant='outline' onClick={() => navigate(appRoute.vendors)}>
            Cancel
          </Button>
          <Button variant='secondary'>Add customer</Button>
        </div>
      </ModuleHeader>

      <form>
        <FormSection title='Business Information' description='Supporting text goes here'>
          <div className='flex items-start gap-4 mb-6'>
            <div className='w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center'>
              <span className='text-gray-500'>📷</span>
            </div>

            <div className='flex flex-col'>
              <Button variant='outline' className='w-32 mb-1'>
                Upload image
              </Button>
              <p className='text-xs text-gray-500'>
                PNG, JPG, files up to 2MB. Recommended size is 128×128px.
              </p>
            </div>
          </div>

          <div className='mb-4'>
            <label htmlFor='business-name' className='block text-sm font-medium mb-1'>
              Business name
            </label>
            <input
              id='business-name'
              type='text'
              placeholder='e.g. Circula'
              className='w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-gray-400'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='phone-number' className='block text-sm font-medium mb-1'>
              Phone number
            </label>
            <input
              id='phone-number'
              type='text'
              placeholder='NG +2348012345678'
              className='w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-gray-400'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium mb-1'>
              Email address
            </label>
            <input
              id='email'
              type='email'
              placeholder='johndoe@circulahq.com'
              className='w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-gray-400'
            />
          </div>
          <div>
            <label htmlFor='role' className='block text-sm font-medium mb-1'>
              Role in value chain
            </label>
            <select
              id='role'
              className='w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-gray-400'
            >
              <option>Select role</option>
              <option>Supplier</option>
              <option>Retailer</option>
            </select>
          </div>
        </FormSection>

        <FormSection title='Business Address' description='Supporting text goes here'>
          <div className='mb-4'>
            <label htmlFor='country' className='block text-sm font-medium mb-1'>
              Country
            </label>
            <select
              id='country'
              className='w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-gray-400'
            >
              <option>Nigeria</option>
              <option>Ghana</option>
            </select>
          </div>

          <div className='mb-4'>
            <label htmlFor='address' className='block text-sm font-medium mb-1'>
              Address
            </label>
            <textarea
              id='address'
              placeholder='Your address'
              className='w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-gray-400'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='lga' className='block text-sm font-medium mb-1'>
              L.G.A.
            </label>
            <input
              id='lga'
              placeholder='Your L.G.A.'
              className='w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-gray-400'
            />
          </div>
          <div>
            <label htmlFor='state' className='block text-sm font-medium mb-1'>
              State
            </label>
            <select
              id='role'
              className='w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-gray-400'
            >
              <option>Select state</option>
              <option>Lagos</option>
              <option>Abuja</option>
            </select>
          </div>
        </FormSection>

        <FormSection title='Bank Details' description='Supporting text goes here'>
          <div className='mb-4'>
            <label htmlFor='bank-name' className='block text-sm font-medium mb-1'>
              Bank name
            </label>
            <select
              id='bank-name'
              className='w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-gray-400'
            >
              <option>Select your bank name</option>
              <option>First Bank</option>
              <option>GT Bank</option>
            </select>
          </div>

          <div className='mb-4'>
            <label htmlFor='account-number' className='block text-sm font-medium mb-1'>
              Account number
            </label>
            <input
              id='account-number'
              placeholder='e.g. 0000000000'
              className='w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-gray-400'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='account-name' className='block text-sm font-medium mb-1'>
              Account name
            </label>
            <input
              id='account-name'
              type='text'
              placeholder='e.g. Circula'
              className='w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-gray-400'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='notes' className='block text-sm font-medium mb-1'>
              Additional notes (Optional)
            </label>
            <textarea
              id='notes'
              placeholder='SWIFT code, Routing number, etc.'
              className='w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-gray-400'
            />
          </div>
        </FormSection>

        <div className='flex justify-end gap-4 mt-8'>
          <Button variant='outline' onClick={() => navigate(appRoute.vendors)}>
            Cancel
          </Button>
          <Button type='submit' variant='secondary'>
            Add customer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBusinessVendor;
