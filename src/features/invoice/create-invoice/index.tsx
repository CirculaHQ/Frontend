import { BackButton, InvoicePreview, ModuleHeader } from "@/components/shared";
import { Button } from "@/components/ui";
import { appRoute } from "@/config/routeMgt/routePaths";
import { useIsMobile } from "@/hooks/use-mobile";
import { Customer } from "@/types/customers";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreateInvoiceForm } from "./create-invoice-form";
import { capitalizeFirstLetterOfEachWord, getCurrencySymbol } from "@/utils/textFormatter";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { LineItem } from "@/types/invoice";
import { format } from "date-fns";
import { Bank } from "@/types/settings";
import { useCreateInvoice, useEditInvoice } from "@/hooks/api/mutations/invoices/useInvoices";
import { useFetchInvoice } from "@/hooks/api/queries/invoices/useInvoicesQuery";
import { PageLoader } from "@/components/loaders";

const CreateInvoice = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const invoiceId = searchParams.get('invoiceId') ?? ''
  const { userID } = useGetUserInfo();

  const [salesTax, setSalesTax] = useState({ amount: '', percent: '' })
  const [discount, setDiscount] = useState({ amount: '', percent: '' })
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
  const [currentView, setCurrentView] = useState<'form' | 'preview'>('form');
  const [items, setItems] = useState<LineItem[]>([
    { id: '1', item_name: '', quantity: 1, unit_price: 0 },
  ]);

  const { mutateAsync: createInvoice, isLoading: isCreatingInvoice } = useCreateInvoice()
  const { mutateAsync: editInvoice, isLoading: isEditingInvoice } = useEditInvoice(invoiceId)
  const { data: editInvoiceData, isLoading: isLoadingInvoice } = useFetchInvoice(invoiceId ?? '')

  const formik = useFormik({
    initialValues: {
      title: '',
      currency: '',
      notes: '',
      due_date: '',
      customer: '',
      account: '',
    },
    onSubmit: async (values) => {
      const payload = {
        ...values,
        account: selectedBank?.id || '',
        user: userID,
        discount: discount.amount || '',
        tax: salesTax.amount || '',
        breakdown: items.map(({ item_name, quantity, unit_price }) => {
          return { item_name, quantity, unit_price }
        })
      }

      if (!invoiceId) {
        // Handles create invoice
        if (isMobile) {
          setCurrentView('preview');
        } else {
          await createInvoice(payload)
          navigate(appRoute.invoices)
        }
      } else {
        // Handles edit invoice
        if (isMobile) {
          setCurrentView('preview');
        } else {
          await editInvoice(payload)
          navigate(appRoute.invoices)
        }
      }
    },
  });

  const calculateSubTotal = (items: any): number => {
    return items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
  };

  const calculateTotal = (): number => {
    const subTotal = items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
    return subTotal + Number(salesTax.amount) - Number(discount.amount);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: String(items.length + 1),
        item_name: '',
        quantity: 1,
        unit_price: 0,
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
          } else if (field === 'unit_price') {
            updatedItem.unit_price = parseFloat(value) || 0;
          } else if (field === 'item_name') {
            updatedItem.item_name = value;
          }

          // Calculate amount
          updatedItem.amount = updatedItem.quantity * updatedItem.unit_price;

          return updatedItem;
        }
        return item;
      })
    );
  };

  const previewData = {
    companyInfo: {
      name: selectedCustomer ? capitalizeFirstLetterOfEachWord((selectedCustomer?.business_name || `${selectedCustomer?.first_name} ${selectedCustomer?.last_name}`)) : 'Company Name',
      address: selectedCustomer?.address || 'Company address',
      city: selectedCustomer?.state || 'City',
      country: selectedCustomer?.country || 'Country',
      phone: selectedCustomer?.phone_number || '+0 (000) 123-4567',
      taxId: '00XXXXX1234X0XX',
    },
    invoiceData: {
      title: formik.values.title,
      number: '#INV - 185',
      date: format(new Date(), 'PP'),
      dueDate: formik.values.due_date ? format(formik.values.due_date, 'PP') : '-----',
      items,
      subtotal: calculateSubTotal(items),
      tax: salesTax.amount || 0,
      discount: discount.amount || 0,
      total: calculateTotal(),
      currency: getCurrencySymbol(formik.values.currency)?.symbol,
      additionalNote: formik.values.notes,
      bankDetails: {
        name: selectedBank?.bank_name ?? '-----',
        ifsCode: 'ABCD000XXXX',
        swiftCode: 'ABCDUSBBXXX',
        accountNumber: selectedBank?.account_number ?? '-----',
      },
    },
  };

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
  }

  const handleSelectBank = (bank: Bank) => {
    setSelectedBank(bank)
  }

  const renderForm = () => (
    <CreateInvoiceForm
      formik={formik}
      items={items}
      invoiceId={invoiceId}
      handleItemChange={handleItemChange}
      handleAddItem={handleAddItem}
      handleRemoveItem={handleRemoveItem}
      handleSelectCustomer={handleSelectCustomer}
      handleSelectBank={handleSelectBank}
      isLoading={isCreatingInvoice || isEditingInvoice}
      salesTax={salesTax}
      setSalesTax={setSalesTax}
      discount={discount}
      setDiscount={setDiscount}
    />
  )

  const renderPreview = () => (
    <InvoicePreview
      companyInfo={previewData.companyInfo}
      invoiceData={previewData.invoiceData}
    />
  )

  useEffect(() => {
    if (invoiceId && editInvoiceData) {
      const subTotal = calculateSubTotal(editInvoiceData?.breakdown)
      formik.setValues({
        title: editInvoiceData?.title || '',
        currency: editInvoiceData?.currency || '',
        notes: editInvoiceData?.notes || '',
        due_date: editInvoiceData?.due_date || '',
        customer: editInvoiceData?.customer?.id || '',
        account: editInvoiceData?.account?.bank_name || '',
      })
      if (editInvoiceData?.breakdown) setItems(editInvoiceData?.breakdown)
      if (editInvoiceData?.customer) setSelectedCustomer(editInvoiceData?.customer)
      if (editInvoiceData?.account) setSelectedBank(editInvoiceData?.account)
      if (editInvoiceData?.tax) setSalesTax({ amount: editInvoiceData?.tax, percent: (Number(editInvoiceData?.tax) / subTotal) * 100 })
      if (editInvoiceData?.discount) setDiscount({ amount: editInvoiceData?.discount, percent: (Number(editInvoiceData?.discount) / subTotal) * 100 })
    }
  }, [invoiceId, editInvoiceData])

  if (isLoadingInvoice && !editInvoiceData) return <PageLoader />;

  return (
    <div className='mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <BackButton route={appRoute.invoices} label='Back to invoices' />
        {isMobile && (
          <Button
            variant='outline'
            onClick={() => setCurrentView(currentView === 'form' ? 'preview' : 'form')}
          >
            {currentView === 'form' ? 'Preview' : 'Edit'}
          </Button>
        )}
      </div>
      <ModuleHeader title={`${invoiceId ? 'Edit' : 'Create new'} invoice`} className='mb-10' />
      {isMobile ? (
        // Mobile Layout
        <div>
          {currentView === 'form' ? (
            <>{renderForm()}</>
          ) : (
            <div>
              <h3 className='bg-[#F5F5F5] px-1.5 py-1 rounded-[4px] uppercase text-primary font-medium text-xs w-fit'>
                Invoice Preview
              </h3>

              <div className='bg-[#F5F5F5] p-4 mt-1.5'>
                {renderPreview()}
              </div>
            </div>
          )
          }
        </div >
      ) : (
        // Desktop Layout
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {renderForm()}
          <div>
            <h3 className='bg-[#F5F5F5] px-1.5 py-1 rounded-[4px] uppercase text-primary font-medium text-xs w-fit'>
              Invoice Preview
            </h3>

            <div className='bg-[#F5F5F5] p-4 mt-1.5'>
              {renderPreview()}
            </div>
          </div>
        </div>
      )}
    </div >
  );
};

export default CreateInvoice;
