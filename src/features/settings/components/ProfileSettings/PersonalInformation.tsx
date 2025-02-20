import { FormSection, SelectFile } from "@/components/shared";
import { Button, Icon, Input, Label } from "@/components/ui";
import { getUserProfile, updateUserProfile, UserProfile } from "@/hooks/api/mutations/settings/user-profile";
import { uploadToCloudinary } from "@/utils/cloudinary-helper";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

interface Props {
    userDetails: any;
}

export default function PersonalInformation({ userDetails }: Readonly<Props>) {
    const [isPersonalInfoEditing, setIsPersonalInfoEditing] = useState(false);
    const [state, setState] = useState({
        selectedFile: null,
        preview: '',
        isUploading: false,
    });

    // Formik for user profile settings
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            phone: '',
            picture: '',
        },
        onSubmit: async (values) => {
            try {
                const updatedData: Partial<UserProfile> = {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    phone: values.phone,
                };

                if (state.selectedFile) {
                    setState({ ...state, isUploading: true });
                    const res = await uploadToCloudinary(state.selectedFile);
                    if ('secure_url' in res) {
                        updatedData.picture = res?.secure_url;
                    }
                    setState({ ...state, isUploading: false });
                }

                await updateUserProfile(updatedData);
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        },
    });

    const selectImage = (e: any) => {
        const { file, preview } = e;
        setState({ ...state, selectedFile: file, preview });
    };

    // Function to check if any field in the personal info form has been modified
    const checkPersonalInfoModified = () => {
        const { initialValues } = formik;
        const currentValues = formik.values;

        return (
            initialValues.first_name !== currentValues.first_name ||
            initialValues.last_name !== currentValues.last_name ||
            initialValues.phone !== currentValues.phone
        );
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profileData = await getUserProfile();
                formik.setValues({
                    first_name: profileData.first_name,
                    last_name: profileData.last_name,
                    phone: profileData.phone || '',
                    picture: profileData.picture,
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    // Update modified state whenever form values change
    useEffect(() => {
        setIsPersonalInfoEditing(checkPersonalInfoModified());
    }, [formik.values]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormSection title='Personal information' description='Supporting text goes here'>
                <div className='flex flex-col gap-2'>
                    <Label>
                        Profile picture <span className='text-quaternary'>(Optional)</span>
                    </Label>
                    <div className='flex items-center gap-4'>
                        <div className='bg-white p-[3px] rounded-2xl shadow-md'>
                            <div className='bg-[#F5F5F5] rounded-2xl w-[72px] h-[72px] border border-[#D5D7DA] flex flex-col items-center justify-center'>
                                {!userDetails?.picture && !state.selectedFile ? (
                                    <Icon name='persona' className='w-9 h-9' />
                                ) : (
                                    <img
                                        src={state.preview || userDetails?.picture}
                                        alt='pics'
                                        width={72}
                                        height={72}
                                        className='object-cover object-top w-[72px] h-[72px] rounded-2xl'
                                    />
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <SelectFile onSelect={selectImage} fileTypes='image/png, image/jpg' />
                            <p className='text-xs text-gray-500'>
                                .png, .jpg, files up to 2MB. Recommended size is 128x128px.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4 w-full'>
                    <Input
                        id='first_name'
                        type='text'
                        placeholder='e.g. John'
                        label='First name'
                        name='first_name'
                        onChange={(e) => {
                            formik.handleChange(e);
                            setIsPersonalInfoEditing(checkPersonalInfoModified());
                        }}
                        // onBlur={formik.handleBlur}
                        value={formik.values.first_name}
                        errorMessage={
                            formik.errors.first_name && formik.touched.first_name
                                ? formik.errors.first_name
                                : ''
                        }
                        onBlur={() => {
                            if (!checkPersonalInfoModified()) {
                                setIsPersonalInfoEditing(false);
                            }
                        }}
                    />
                    <Input
                        id='last_name'
                        type='text'
                        placeholder='e.g. Doe'
                        label='Last name'
                        name='last_name'
                        onChange={(e) => {
                            formik.handleChange(e);
                            setIsPersonalInfoEditing(checkPersonalInfoModified());
                        }}
                        // onBlur={formik.handleBlur}
                        value={formik.values.last_name}
                        errorMessage={
                            formik.errors.last_name && formik.touched.last_name ? formik.errors.last_name : ''
                        }
                        // onFocus={() => setIsPersonalInfoEditing(true)}
                        onBlur={() => {
                            if (!checkPersonalInfoModified()) {
                                setIsPersonalInfoEditing(false);
                            }
                        }}
                    />
                </div>
                <Input
                    id='phone'
                    type='text'
                    placeholder='NG +2348012345678'
                    label='Phone number'
                    name='phone'
                    onChange={(e) => {
                        formik.handleChange(e);
                        setIsPersonalInfoEditing(checkPersonalInfoModified());
                    }}
                    // onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    errorMessage={formik.errors.phone && formik.touched.phone ? formik.errors.phone : ''}
                    // onFocus={() => setIsPersonalInfoEditing(true)}
                    onBlur={() => {
                        if (!checkPersonalInfoModified()) {
                            setIsPersonalInfoEditing(false);
                        }
                    }}
                />
            </FormSection>
            <div className='flex justify-end gap-4 mt-8'>
                <Button type='button' variant='outline' disabled={state.isUploading} onClick={() => setIsPersonalInfoEditing(false)}>
                    Cancel
                </Button>
                <Button type='submit' variant='secondary' isLoading={state.isUploading}>
                    Update Information
                </Button>
            </div>
        </form>
    )
}