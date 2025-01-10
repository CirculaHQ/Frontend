import { useState, useEffect } from 'react';
import { FormSection } from '@/components/shared';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui';
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Bank, deleteBank, getBanks, editBank, addBank } from '@/hooks/api/mutations/settings/bank';
import { useFormik } from 'formik';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import {
  getUserProfile,
  updateUserProfile,
  UserProfile,
} from '@/hooks/api/mutations/settings/user-profile';

interface ProfileSettingsProps {}

const ProfileSettings: React.FC<ProfileSettingsProps> = () => {
  const { userID } = useGetUserInfo();
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingBank, setEditingBank] = useState<Bank | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPersonalInfoEditing, setIsPersonalInfoEditing] = useState(false);
  const [isOrgInfoEditing, setIsOrgInfoEditing] = useState(false);

  // Formik for user profile settings
  const formik = useFormik({
    initialValues: {
      organization: '',
      first_name: '',
      last_name: '',
      phone: '',
      commodities: [] as string[],
      picture: '',
      company_logo: '',
    },
    onSubmit: async (values) => {
      try {
        const updatedData: Partial<UserProfile> = {
          first_name: values.first_name,
          last_name: values.last_name,
          organization: values.organization,
          phone: values.phone,
          commodities: values.commodities,
        };

        await updateUserProfile(updatedData);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
  });

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

  // Function to check if any field in the organization info form has been modified
  const checkOrgInfoModified = () => {
    const { initialValues } = formik;
    const currentValues = formik.values;

    return (
      initialValues.organization !== currentValues.organization ||
      initialValues.commodities !== currentValues.commodities
    );
  };

  // Update modified state whenever form values change
  useEffect(() => {
    setIsPersonalInfoEditing(checkPersonalInfoModified());
    setIsOrgInfoEditing(checkOrgInfoModified());
  }, [formik.values]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile();
        formik.setValues({
          organization: profileData.organization,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          phone: profileData.phone || '',
          commodities: profileData.commodities,
          picture: profileData.picture,
          company_logo: profileData.company_logo,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // Formik for bank settings
  const bankFormik = useFormik({
    initialValues: {
      nickname: '',
      bank_name: '',
      account_number: '',
      account_name: '',
      notes: '',
      user: userID,
    },
    onSubmit: async (values) => {
      try {
        if (isEditMode && editingBank) {
          const response = await editBank(editingBank.id, values);
          setBanks(
            banks.map((bank) =>
              bank.id === editingBank.id ? { ...response, id: editingBank.id } : bank
            )
          );
        } else {
          const response = await addBank({ ...values, user: userID });
          const newBank: Bank = {
            ...values,
            id: response.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setBanks([...banks, newBank]);
        }

        bankFormik.resetForm();
        setIsDialogOpen(false);
        setIsEditMode(false);
        setEditingBank(null);
      } catch (error) {
        console.error('Error adding/editing bank:', error);
      }
    },
  });

  const handleEdit = (bank: Bank) => {
    setIsEditMode(true);
    setEditingBank(bank);
    bankFormik.setValues({
      nickname: bank.nickname,
      bank_name: bank.bank_name,
      account_number: bank.account_number,
      account_name: bank.account_name,
      notes: bank.notes,
      user: bank.user,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (bankId: string) => {
    try {
      await deleteBank(bankId);
      setBanks(banks.filter((bank) => bank.id !== bankId));
    } catch (error) {
      console.error('Error deleting bank:', error);
    }
  };

  const fetchBanks = async (limit: number = 100, offset: number = 0) => {
    if (userID) {
      try {
        const response = await getBanks(limit, offset);
        setBanks(response.results);
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    }
  };

  useEffect(() => {
    fetchBanks();
  }, [userID]);

  return (
    <>
      <div className='flex flex-col items-start mb-8'>
        <h2 className='text-lg font-semibold text-primary'>Profile settings</h2>
        <p className='text-tertiary font-normal text-sm'>
          Manage your team members and their account permissions here.
        </p>
      </div>
      <form>
        <FormSection title='Personal information' description='Supporting text goes here'>
          <div className='flex flex-col gap-2'>
            <Label>
              Profile picture
              <span className='text-quaternary'>(Optional)</span>
            </Label>
            <div className='flex items-center gap-4'>
              <div className='bg-white p-[3px] rounded-2xl shadow-md'>
                <div className='bg-[#F5F5F5] rounded-2xl w-[72px] h-[72px] border border-[#D5D7DA] flex flex-col items-center justify-center'>
                  <Icon name='persona' className='w-9 h-9' />
                </div>
              </div>
              <div className='flex flex-col'>
                <Button className='w-fit mb-1'>Upload image</Button>
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
        {isPersonalInfoEditing && (
          <div className='flex justify-end gap-4 mt-8'>
            <Button variant='outline' onClick={() => setIsPersonalInfoEditing(false)}>
              Cancel
            </Button>
            <Button type='submit' variant='secondary' onClick={() => formik.handleSubmit()}>
              Update Information
            </Button>
          </div>
        )}

        <FormSection title='Organisation information' description='Supporting text goes here'>
          <div className='flex flex-col gap-2'>
            <Label>
              Company logo
              <span className='text-quaternary'>(Optional)</span>
            </Label>
            <div className='flex items-center gap-4'>
              <div className='bg-white p-[3px] rounded-2xl shadow-md'>
                <div className='bg-[#F5F5F5] rounded-2xl w-[72px] h-[72px] border border-[#D5D7DA] flex flex-col items-center justify-center'>
                  <Icon name='persona' className='w-9 h-9' />
                </div>
              </div>

              <div className='flex flex-col'>
                <Button className='w-fit mb-1'>Upload image</Button>
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
        {isOrgInfoEditing && (
          <div className='flex justify-end gap-4 mt-8'>
            <Button variant='outline' onClick={() => setIsOrgInfoEditing(false)}>
              Cancel
            </Button>
            <Button type='submit' variant='secondary' onClick={() => formik.handleSubmit()}>
              Update Information
            </Button>
          </div>
        )}

        <FormSection title='Bank information' description='Supporting text goes here'>
          {banks.length === 0 ? (
            <div>
              <h2 className='text-sm text-secondary font-semibold'>No bank account added</h2>
              <p className='text-sm text-tertiary font-normal'>
                Add a bank account to your profile and they will show up here
              </p>
            </div>
          ) : (
            <div className='w-full divide-y'>
              {banks.map((bank, index) => (
                <div
                  key={index}
                  className='grid grid-cols-[1fr_auto] gap-4 items-center w-full py-4'
                >
                  <div className='flex flex-col gap-0.5'>
                    <p className='text-sm font-medium'>{bank.nickname}</p>
                    <p className='text-sm text-gray-500'>{bank.account_name}</p>
                  </div>
                  <div className='flex items-center justify-end gap-4'>
                    <div className='flex flex-col gap-0.5 text-right'>
                      <p className='text-sm font-medium'>{bank.bank_name}</p>
                      <p className='text-sm text-gray-500'>{bank.account_number}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className='w-4 h-4'>
                          <Icon name='horizontal-dots' className='w-4 h-4 text-quaternary' />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align='end'
                        className='text-sm font-medium text-secondary rounded-[8px] px-1'
                      >
                        <DropdownMenuItem className='py-2 rounded-[8px]'>
                          Copy account
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='py-2 rounded-[8px]'
                          onClick={() => handleEdit(bank)}
                        >
                          Edit account
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='py-2 rounded-[8px]'
                          onClick={() => handleDelete(bank.id)}
                        >
                          Delete account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button
            variant='outline'
            onClick={(event) => {
              event.preventDefault();
              setIsEditMode(false);
              bankFormik.resetForm();
              setIsDialogOpen(true);
            }}
          >
            Add bank account
          </Button>
        </FormSection>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <Icon name='bank-modal' className='w-10 h-10 mb-4' />
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit bank account' : 'Add bank account'}</DialogTitle>
            <DialogDescription>
              This account will be used when you send out invoices.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={bankFormik.handleSubmit}>
            <div className='grid gap-4 py-4'>
              <Input
                label='Nickname'
                placeholder='e.g. Naira account'
                name='nickname'
                onChange={bankFormik.handleChange}
                onBlur={bankFormik.handleBlur}
                value={bankFormik.values.nickname}
                errorMessage={
                  bankFormik.errors.nickname && bankFormik.touched.nickname
                    ? bankFormik.errors.nickname
                    : ''
                }
              />
              <Input
                label='Bank name'
                placeholder='e.g. Access Bank'
                name='bank_name'
                onChange={bankFormik.handleChange}
                onBlur={bankFormik.handleBlur}
                value={bankFormik.values.bank_name}
                errorMessage={
                  bankFormik.errors.bank_name && bankFormik.touched.bank_name
                    ? bankFormik.errors.bank_name
                    : ''
                }
              />
              <Input
                label='Account number'
                placeholder='e.g. 0000000000'
                name='account_number'
                onChange={bankFormik.handleChange}
                onBlur={bankFormik.handleBlur}
                value={bankFormik.values.account_number}
                errorMessage={
                  bankFormik.errors.account_number && bankFormik.touched.account_number
                    ? bankFormik.errors.account_number
                    : ''
                }
              />
              <Input
                label='Account name'
                placeholder='e.g. Drew Cano'
                name='account_name'
                onChange={bankFormik.handleChange}
                onBlur={bankFormik.handleBlur}
                value={bankFormik.values.account_name}
                errorMessage={
                  bankFormik.errors.account_name && bankFormik.touched.account_name
                    ? bankFormik.errors.account_name
                    : ''
                }
              />
              <Textarea
                id='notes'
                placeholder='SWIFT code, Routing number, etc.'
                label='Additional notes (Optional)'
                name='notes'
                onChange={bankFormik.handleChange}
                onBlur={bankFormik.handleBlur}
                value={bankFormik.values.notes}
                errorMessage={
                  bankFormik.errors.notes && bankFormik.touched.notes ? bankFormik.errors.notes : ''
                }
              />
            </div>
            <DialogFooter>
              <Button variant='outline' type='button' onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type='submit' variant='secondary'>
                {isEditMode ? 'Save changes' : 'Add account'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileSettings;
