export const appRoute = {
  home: `/`,
  login_in: `/login`,
  sign_up: `/signup`,
  sign_up_confirmation: `/signup-verification`,
  login_confirmation: `/login-verification`,
  forgot_password: `/forgot-password`,
  reset_password: `/reset-password`,

  operations: `/operations`,
  operations_details: `/operations/operations-details`,
  add_operation: `/operations/add-operation`,

  settings: `/settings`,

  dashboard: `/dashboard`,
  inventory: `/inventory`,
  inventory_details: (id?: number | string) => ({
    format: `/inventory/:id`,
    path: `/inventory/${id}`,
  }),
  add_inventory: `/inventory/add-inventory`,

  reports: '/reports',
  customers: `/customers`,
  vendors: `/vendors`,

  invoice: `/invoices`,
  create_invoice: `/invoices/create-invoice`,

  add_vendor: `/vendors/add-vendor`,
  vendor_details: `/vendors/vendor-details`,
  customer_details: `/customers/customer-details`,
};
