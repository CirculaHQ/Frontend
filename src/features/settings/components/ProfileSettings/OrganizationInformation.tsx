import { FormSection, SelectFile } from "@/components/shared";
import { Button, Icon, Input, Label, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { getUserProfile, updateUserProfile, UserProfile } from "@/hooks/api/mutations/settings/user-profile";
import { uploadToCloudinary } from "@/utils/cloudinary-helper";
import { Select } from "@radix-ui/react-select";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

interface Props {
    userDetails: any;
}

export default function OrganizationalInformation({ userDetails }: Readonly<Props>) {
    const [isOrgInfoEditing, setIsOrgInfoEditing] = useState(false);
    const [state, setState] = useState({
        selectedFile: null,
        preview: '',
        isUploading: false,
    });

    // Formik for user profile settings
    const formik = useFormik({
        initialValues: {
            organization: '',
            phone: '',
            commodities: [] as string[],
            company_logo: '',
        },
        onSubmit: async (values) => {
            try {
                const updatedData: Partial<UserProfile> = {
                    organization: values.organization,
                    commodities: values.commodities,
                };

                if (state.selectedFile) {
                    setState({ ...state, isUploading: true });
                    const res = await uploadToCloudinary(state.selectedFile);
                    if ('secure_url' in res) {
                        updatedData.company_logo = res?.secure_url;
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

    // Function to check if any field in the organization info form has been modified
    const checkOrgInfoModified = () => {
        const { initialValues } = formik;
        const currentValues = formik.values;

        return (
            initialValues.organization !== currentValues.organization ||
            initialValues.commodities !== currentValues.commodities
        );
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profileData = await getUserProfile();
                formik.setValues({
                    organization: profileData.organization?.name,
                    phone: profileData.phone || '',
                    commodities: profileData.commodities,
                    company_logo: profileData.organization.logo,
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    // Update modified state whenever form values change
    useEffect(() => {
        setIsOrgInfoEditing(checkOrgInfoModified());
    }, [formik.values]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormSection title='Organisation information' description='Supporting text goes here'>
                <div className='flex flex-col gap-2'>
                    <Label>
                        Company logo <span className='text-quaternary'>(Optional)</span>
                    </Label>
                    <div className='flex items-center gap-4'>
                        <div className='bg-white p-[3px] rounded-2xl shadow-md'>
                            <div className='bg-[#F5F5F5] rounded-2xl w-[72px] h-[72px] border border-[#D5D7DA] flex flex-col items-center justify-center'>
                                {!userDetails?.organization?.logo && !state.selectedFile ? (
                                    <Icon name='persona' className='w-9 h-9' />
                                ) : (
                                    <img
                                        src={state.preview || userDetails?.organization?.logo}
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
                <Input
                    id='organization'
                    type='text'
                    placeholder='Circula HQ'
                    label='Organisation name'
                    name='organization'
                    onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    value={formik.values.organization}
                    errorMessage={
                        formik.errors.organization && formik.touched.organization
                            ? formik.errors.organization
                            : ''
                    }
                    // onFocus={() => setIsOrgInfoEditing(true)}
                    onBlur={() => {
                        if (checkOrgInfoModified()) {
                            setIsOrgInfoEditing(true);
                        } else {
                            setIsOrgInfoEditing(false);
                        }
                    }}
                />
                <div className='w-full flex flex-col gap-1.5'>
                    <Label>What commodities do you recycle?</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue
                                placeholder='Select commodities'
                                className='text-placeholder font-normal'
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='plastic'>Plastic</SelectItem>
                            <SelectItem value='paper'>Paper/cardboard</SelectItem>
                            <SelectItem value='metal'>Metal</SelectItem>
                            <SelectItem value='rubber'>Rubber</SelectItem>
                            <SelectItem value='glass'>Glass</SelectItem>
                            <SelectItem value='e-waste'>E-waste</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </FormSection>
            <div className='flex justify-end gap-4 mt-8'>
                <Button type='button' variant='outline' onClick={() => setIsOrgInfoEditing(false)}>
                    Cancel
                </Button>
                <Button type='submit' variant='secondary'>
                    Update Information
                </Button>
            </div>
        </form>
    )
}