import * as Yup from 'yup';

const CustomerSchema = {
    phone_number: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email'),
    lga: Yup.string(),
    account_number: Yup.string(),
    account_name: Yup.string(),
    state: Yup.string(),
    bank_name: Yup.string(),
    country: Yup.string().required('Country is required'),
    role: Yup.string(),
    notes: Yup.string(),
    address: Yup.string().required('Address is required'),
}

export const AddCustomerSchema = {
    Business: Yup.object().shape({
        ...CustomerSchema,
        business_name: Yup.string()
            .min(2, 'Password must be at least 2 characters')
            .required('Business name is required'),
    }),
    Individual: Yup.object().shape({
        ...CustomerSchema,
        first_name: Yup.string()
            .min(2, 'First name must be at least 2 characters')
            .required('First name name is required'),
        last_name: Yup.string()
            .min(2, 'Last name must be at least 2 characters')
            .required('Last name is required'),
        nickname: Yup.string()
            .min(2, 'Nickname must be at least 2 characters'),
    })
}