export const appRoute = {
  home: `/`,
  login_in: `/login`,
  sign_up: `/signup`,
  sign_up_confirmation: `/signup-verification`,
  login_confirmation: `/login-verification`,
  forgot_password: `/forgot-password`,
  reset_password: `/reset-password`,

  operations: `/operations`,
  operationDetails: (id?: number | string) => ({
    format: `/operations/:operationId`,
    path: `/operations/${id}`,
  }),
  add_operation: `/operations/add-operation`,
  editOperation: (id?: number | string) => `/operations/add-operation?operationId=${id}`,

  settings: `/settings`,

  dashboard: `/dashboard`,
  activities: '/dashboard/activities',
  inventory: `/inventory`,
  inventory_details: (id?: number | string) => ({
    format: `/inventory/:id`,
    path: `/inventory/${id}`,
  }),
  add_inventory: `/inventory/add-inventory`,

  reports: '/reports',
  customers: `/customers`,
  vendors: `/vendors`,

  invoices: `/invoices`,
  create_invoice: `/invoices/manage-invoice`,
  editInvoice: (id?: number | string) => `/invoices/manage-invoice?invoiceId=${id}`,
  invoiceDetails: (id?: number | string) => ({
    format: `/invoices/:invoiceId`,
    path: `/invoices/${id}`,
  }),

  add_vendor: `/vendors/add-vendor`,
  editVendor: (id?: string) => `/vendors/add-vendor?id=${id}`,
  vendorDetails: (id?: number | string) => ({
    format: `/vendors/:id`,
    path: `/vendors/${id}`,
  }),
  customer_details: `/customers/customer-details`,

  add_customer: `/customers/add-customer`,
  editCustomer: (id?: string) => `/customers/add-customer?id=${id}`,
};
