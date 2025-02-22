export const RAW = 'raw'
export const IN = 'in'
export const INVENTORY = 'inventory'
export const SUPER_ADMIN = 'super_admin'
export const ADMIN = 'admin'
export const MANAGER = 'manager'
export const OPERATIONS_MANAGER = 'operations_manager'
export const FINANCE_MANAGER = 'finance_manager'
export const VIEWER = 'viewer'

export const CURRENCIES = [
    { name: 'Naira', country: 'Nigeria', symbol: '₦', shortCode: 'NGN', icon: '' },
    { name: 'Pounds', country: 'United Kingdom', symbol: '£', shortCode: 'GBP', icon: '' },
    { name: 'Dollars', country: 'United States', symbol: '$', shortCode: 'USD', icon: '' },
    { name: 'Euros', country: 'Spain', symbol: '€', shortCode: 'EUR', icon: '' }
]

export const ROLE_IN_VALUE_CHAIN = [
    { name: 'waste picker', value: 'WASTE_PICKER' },
    { name: 'aggregator', value: 'AGGREGATOR' },
    { name: 'recycler', value: 'RECYCLER' },
    { name: 'trader', value: 'TRADER' },
    { name: 'manufacturer', value: 'MANUFACTURER' },
]

export const chartDurationFilter = [
    { name: '1D' },
    { name: '5D' },
    { name: '1M' },
    { name: '6M' },
    { name: '1Y' }
]