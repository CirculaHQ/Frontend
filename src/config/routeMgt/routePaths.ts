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
  onboarding: `/onboarding`,
  onboarding_plans: `/onboarding/plans-and-pricing`,
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

  invoices: `/sales`,
  create_invoice: `/sales/manage-invoice`,
  editInvoice: (id?: number | string) => `/sales/manage-invoice?invoiceId=${id}`,
  invoiceDetails: (id?: number | string) => ({
    format: `/sales/:invoiceId`,
    path: `/sales/${id}`,
  }),

  add_vendor: `/vendors/add-vendor`,
  editVendor: (id: string, type: string) => `/vendors/add-vendor?id=${id}&type=${type}`,
  vendorDetails: (id?: number | string) => ({
    format: `/vendors/:id`,
    path: `/vendors/${id}`,
  }),

  add_customer: `/customers/add-customer`,
  editCustomer: (id: string, type: string) => `/customers/add-customer?id=${id}&type=${type}`,
  customerDetails: (id?: number | string) => ({
    format: `/customers/:id`,
    path: `/customers/${id}`,
  }),
};
