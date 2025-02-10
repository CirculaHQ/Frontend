import { InvoicePreview, ModuleHeader } from '@/components/shared';
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
  SelectSeparator,
  Avatar,
  AvatarImage,
  AvatarFallback,
  DatePicker,
} from '@/components/ui';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useIsMobile } from '@/hooks/use-mobile';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LineItem {
  id: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
}

const FormSection: React.FC<{
  formik: any;
  items: LineItem[];
  handleItemChange: (id: string, field: keyof LineItem, value: string) => void;
  handleAddItem: () => void;
  handleRemoveItem: (id: string) => void;
}> = ({ formik, items, handleItemChange, handleAddItem, handleRemoveItem }) => {
  const navigate = useNavigate();
  return (
    <form className='w-full flex flex-col gap-4'>
      <div className='w-full flex flex-col gap-1.5'>
        <Label>Customer</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Select customer' className='text-placeholder font-normal' />
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
            <div className='text-tertiary font-normal text-sm px-4 py-2'>Can't find vendor?</div>
            <div
              onClick={() => navigate(`${appRoute.add_vendor}?type=business`)}
              className='px-4 py-2 flex flex-row items-center justify-between'
            >
              <div className='flex flex-row items-center gap-2'>
                <Icon name='user-right' className='w-5 h-5' />
                <span className='text-sm text-primary font-medium'>Add new business vendor</span>
              </div>
              <Icon name='chevron-right' className='w-5 h-5' />
            </div>

            <div
              onClick={() => navigate(`${appRoute.add_vendor}?type=business`)}
              className='px-4 py-2 flex flex-row items-center justify-between'
            >
              <div className='flex flex-row items-center gap-2'>
                <Icon name='user-right' className='w-5 h-5' />
                <span className='text-sm text-primary font-medium'>Add new individual vendor</span>
              </div>
              <Icon name='chevron-right' className='w-5 h-5' />
            </div>
          </SelectContent>
        </Select>
      </div>

      <Input
        id='title'
        type='text'
        placeholder='Title'
        label='Invoice title'
        name='title'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        errorMessage={formik.errors.title && formik.touched.title ? formik.errors.title : ''}
      />

      <div className='w-full'>
        <Label className='mb-1.5'>Date received</Label>
        <DatePicker />
      </div>

      <div className='w-full flex flex-col gap-1.5'>
        <Label>Currency</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Select currency' className='text-placeholder font-normal' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='m@example.com'>Nigerian Naira</SelectItem>
            <SelectItem value='m@google.com'>Ghanian Cedis</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        {items.map((item) => (
          <div key={item.id} className='flex flex-col gap-4 mb-2'>
            <div className='w-full grid grid-cols-12 items-start gap-3'>
              {/* Item Name - Takes up most space */}
              <div className={items.length > 1 ? 'col-span-5 md:col-span-7' : 'col-span-7 md:col-span-7'}>
                <Input
                  type='text'
                  label='Item name'
                  value={item.itemName}
                  onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)}
                />
              </div>

              {/* Quantity - Small fixed width */}
              <div className='col-span-2 md:col-span-2'>
                <Input
                  type='number'
                  label='Qty'
                  value={item.quantity}
                  onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                  min='1'
                />
              </div>

              {/* Unit Price - Medium fixed width */}
              <div
                className={items.length > 1 ? 'col-span-3 md:col-span-2' : 'col-span-3 md:col-span-3'}
              >
                <Input
                  type='number'
                  label='Unit price'
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)}
                  min='0'
                />
              </div>

              {/* Delete Icon - Only show if there's more than one item */}
              {items.length > 1 && (
                <div className='col-span-2 md:col-span-1 flex justify-center'>
                  <div className='h-10 w-10 bg-[#FAFAFA] rounded-lg flex items-center justify-center mt-6'>
                    <Icon
                      name='trash'
                      className='w-4 h-4 text-[#A4A7AE] cursor-pointer hover:text-red-500 transition-colors'
                      onClick={() => handleRemoveItem(item.id)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        className='text-disabled mt-[-1rem] text-sm font-normal cursor-pointer hover:text-[#2C6000] hover:underline'
        onClick={handleAddItem}
      >
        + Add Item
      </div>

      <Input
        id='salesTax'
        type='text'
        placeholder='₦'
        label='Sales tax'
        tag='%'
        name='salesTax'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.salesTax}
        errorMessage={
          formik.errors.salesTax && formik.touched.salesTax ? formik.errors.salesTax : ''
        }
      />

      <Input
        id='discount'
        type='text'
        placeholder='₦'
        label='Discount'
        tag='%'
        name='discount'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.discount}
        errorMessage={
          formik.errors.discount && formik.touched.discount ? formik.errors.discount : ''
        }
      />

      <Input
        id='additionalNote'
        type='text'
        label='Additional Note'
        name='additionalNote'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.additionalNote}
        errorMessage={
          formik.errors.additionalNote && formik.touched.additionalNote
            ? formik.errors.additionalNote
            : ''
        }
      />

      <div className='w-full flex flex-col gap-1.5'>
        <Label>Bank account</Label>
        <Select
          onValueChange={(value) => {
            formik.setFieldValue('bank', { name: value});
          }}
        >
          <SelectTrigger>
            <SelectValue
              placeholder='Select your bank account'
              className='text-placeholder font-normal'
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='First Bank'>First Bank</SelectItem>
            <SelectItem value='GT Bank'>GT Bank</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex justify-end gap-4 mt-8'>
        <Button variant='outline' onClick={() => navigate(appRoute.vendors)}>
          Cancel
        </Button>
        <Button type='submit' variant='secondary'>
          Create invoice
        </Button>
      </div>
    </form>
  );
};
const CreateInvoice = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState<'form' | 'preview'>('form');
  const [items, setItems] = useState<LineItem[]>([
    { id: '1', itemName: '', quantity: 1, unitPrice: 0 },
  ]);

  const formik = useFormik({
    initialValues: {
      title: '',
      itemName: '',
      unitPrice: '',
      salesTax: '',
      discount: '',
      additionalNote: '',
      phoneNumber: '',
      email: '',
      amount: '',
      quantity: '',
      bank: {
        name: ''
      }
    },
    onSubmit: (values) => {
      if (isMobile) {
        setCurrentView('preview');
      }
    },
  });

  const calculateLineItemAmount = (quantity: number, unitPrice: number): number => {
    return quantity * unitPrice;
  };

  const calculateSubTotal = (): number => {
    return items.reduce((sum, item) => sum + item.unitPrice, 0);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: String(items.length + 1),
        itemName: '',
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleItemChange = (id: string, field: keyof LineItem, value: string) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item };

          if (field === 'quantity') {
            updatedItem.quantity = parseFloat(value) || 0;
          } else if (field === 'unitPrice') {
            updatedItem.unitPrice = parseFloat(value) || 0;
          } else if (field === 'itemName') {
            updatedItem.itemName = value;
          }

          // Calculate amount
          updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice;

          return updatedItem;
        }
        return item;
      })
    );
  };

  const previewData = {
    companyInfo: {
      name: 'Company Name',
      address: 'Company address',
      city: 'City',
      country: 'Country',
      phone: '+0 (000) 123-4567',
      taxId: '00XXXXX1234X0XX',
    },
    invoiceData: {
      title: formik.values.title,
      number: '#INV - 185',
      date: '12 Nov, 2024',
      dueDate: '15 Nov, 2024',
      items: items,
      subtotal: calculateSubTotal(),
      tax: parseFloat(formik.values.salesTax) || 0,
      discount: parseFloat(formik.values.discount) || 0,
      total: 1000,
      additionalNote: formik.values.additionalNote,
      bankDetails: {
        name: formik.values.bank.name,
        ifsCode: 'ABCD000XXXX',
        swiftCode: 'ABCDUSBBXXX',
        accountNumber: '3747489 2300011',
      },
    },
  };

  return (
    <div className='md:p-6 mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <button
          onClick={() => navigate(appRoute.invoice)}
          className='text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1'
        >
          <Icon name='arrow-left' className='w-5 h-5' /> Back to invoices
        </button>
        {isMobile && (
          <Button
            variant='outline'
            onClick={() => setCurrentView(currentView === 'form' ? 'preview' : 'form')}
          >
            {currentView === 'form' ? 'Preview' : 'Edit'}
          </Button>
        )}
      </div>

      <ModuleHeader title='Create new invoice' className='mb-10' />

      {isMobile ? (
        // Mobile Layout
        <div>
          {currentView === 'form' ? (
            <FormSection
              formik={formik}
              items={items}
              handleItemChange={handleItemChange}
              handleAddItem={handleAddItem}
              handleRemoveItem={handleRemoveItem}
            />
          ) : (
            <div>
              <h3 className='bg-[#F5F5F5] px-1.5 py-1 rounded-[4px] uppercase text-primary font-medium text-xs w-fit'>
                Invoice Preview
              </h3>

              <div className='bg-[#F5F5F5] p-4 mt-1.5'>
                <InvoicePreview
                  companyInfo={previewData.companyInfo}
                  invoiceData={previewData.invoiceData}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        // Desktop Layout
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <FormSection
            formik={formik}
            items={items}
            handleItemChange={handleItemChange}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
          />
          <div>
            <h3 className='bg-[#F5F5F5] px-1.5 py-1 rounded-[4px] uppercase text-primary font-medium text-xs w-fit'>
              Invoice Preview
            </h3>

            <div className='bg-[#F5F5F5] p-4 mt-1.5'>
              <InvoicePreview
                companyInfo={previewData.companyInfo}
                invoiceData={previewData.invoiceData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateInvoice;
