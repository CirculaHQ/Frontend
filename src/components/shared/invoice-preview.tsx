// Create a new component InvoicePreview.tsx
import React from 'react';
import { Icon } from '@/components/ui';

interface InvoicePreviewProps {
  companyInfo: {
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    taxId: string;
  };
  invoiceData: {
    title: string;
    number: string;
    date: string;
    dueDate: string;
    items: Array<{
      id: string;
      itemName: string;
      quantity: number;
      unitPrice: number;
      amount: number;
    }>;
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    additionalNote: string;
    bankDetails: {
      name: string;
      ifsCode: string;
      swiftCode: string;
      accountNumber: string;
    };
  };
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ companyInfo, invoiceData }) => {
  const { title, additionalNote, date, dueDate, number, items } = invoiceData

  const calculateLineTotal = (item: any) => {
    const { unitPrice, quantity } = item
    if (!unitPrice || !quantity) return '-----'
    if (unitPrice && quantity) return unitPrice * quantity
  }

  return (
    <div className="bg-white px-8 py-4 shadow-sm border">
      {/* Header */}
      <div className="flex justify-between mb-8 mt-4">
        <div>
          <Icon name="invoice-logo" className="w-9 h-9" />
        </div>
        <div className="text-right font-normal text-[10px] text-[#5E6470]">
          <p>{companyInfo.address}</p>
          <p>{`${companyInfo.city}, ${companyInfo.country}`}</p>
          <p>TAX ID {companyInfo.taxId}</p>
        </div>
      </div>

      {/* Billing Info */}
      <div className="mb-8 text-[10px]">
        <h3 className="text-[#5E6470] font-medium mb-0.5">Billed to</h3>
        <h2 className="text-[#1A1C21] font-semibold mb-1">{companyInfo.name}</h2>
        <p className="text-[#5E6470]">{companyInfo.address}</p>
        <p className="text-[#5E6470]">{`${companyInfo.city}, ${companyInfo.country}`}</p>
        <p className="text-[#5E6470]">{companyInfo.phone}</p>
      </div>

      <div className='mb-5'>
        <h3 className='text-[10px] text-[#1A1C21] font-semibold'>{title || 'Title'}</h3>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-3 gap-4 mb-8 pb-[14.2px] text-[10px] border-b">
        <div>
          <p className="text-[#1A1C21] font-semibold">Invoice Date</p>
          <p className="font-semibold text-[#5E6470]">{date || '-----'}</p>
        </div>
        <div>
          <p className="text-[#1A1C21] font-semibold">Due</p>
          <p className="font-semibold text-[#5E6470]">{dueDate || '-----'}</p>
        </div>
        <div className='justify-self-end'>
          <p className="text-[#1A1C21] font-semibold">Invoice no</p>
          <p className="font-semibold text-[#5E6470]">{number || '-----'}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8 text-[10px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="py-3 font-medium">Service</th>
              <th className="py-3 font-medium">Qty</th>
              <th className="py-3 font-medium text-right">Unit Price</th>
              <th className="py-3 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-3">{item.itemName || '-----'}</td>
                <td className="py-3">{item.quantity || '-----'}</td>
                <td className="py-3 text-right">${item.unitPrice || '-----'}</td>
                <td className="py-3 text-right">
                  ${calculateLineTotal(item)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="flex justify-end mb-8 text-[10px]">
        <div className="w-1/2">
          <div className="flex justify-between py-2 border-t border-t-[#D7DAE0]">
            <span className="text-[#1A1C21] font-semibold">Subtotal</span>
            <span className="font-medium text-[#5E6470] text-xs">${invoiceData.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-t-[#D7DAE0]">
            <span className="text-[#1A1C21] font-semibold">Tax ({invoiceData.tax}%)</span>
            <span className="font-medium text-[#5E6470] text-xs">${(invoiceData.subtotal * invoiceData.tax / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-t-[#D7DAE0]">
            <span className="text-[#1A1C21] font-semibold">Discount</span>
            <span className="font-medium text-[#5E6470] text-xs">${invoiceData.discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t font-semibold">
            <span className="text-[#1A1C21] font-semibold">Total</span>
            <span className='text-[#1A1C21] font-medium text-xs'>${invoiceData.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t-2 border-b-2 border-t-[#181D27] border-b-[#181D27]">
            <span className="font-medium">Amount due</span>
            <span className="font-bold">US$ {invoiceData.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-8 pt-8 border-t text-[10px]">
        <div className="border-l-2 border-l-[#5E6470] px-2">
          <h3 className="font-medium mb-2 text-[#1A1C21]">Additional note</h3>
          <p className="text-[#5E6470]">{additionalNote}</p>
        </div>
        <div className="text-right">
          <h3 className="font-medium mb-2">Bank Details</h3>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-[#1A1C21] font-medium">Bank name</span>
              <span className="font-medium text-[#5E6470]">{invoiceData.bankDetails.name || '-----'}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-[#1A1C21] font-medium">IFS code</span>
              <span className="font-medium text-[#5E6470]">{invoiceData.bankDetails.ifsCode}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-[#1A1C21] font-medium">Swift code</span>
              <span className="font-medium text-[#5E6470]">{invoiceData.bankDetails.swiftCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1A1C21] font-medium">Account #</span>
              <span className="font-medium text-[#5E6470]">{invoiceData.bankDetails.accountNumber}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Branding */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t text-[10px]">
        <div className="flex items-center">
          <Icon name="logo" className="w-5 h-5 mr-1" />
          <span className='text-brand font-medium text-sm'>Circula</span>
        </div>
        <span className="text-gray-600">©circular</span>
      </div>
    </div>
  );
};

export { InvoicePreview };