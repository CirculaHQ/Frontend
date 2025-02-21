import PersonalInformation from './PersonalInformation';
import OrganizationalInformation from './OrganizationInformation';
import BankInformation from './BankInformation';
import { useFetchUserProfile } from '@/hooks/api/queries/settings/useUser';
import { PageLoader } from '@/components/loaders';
import { SUPER_ADMIN } from '@/config/common';

const ProfileSettings = () => {
    const { data: user, isLoading } = useFetchUserProfile()

    if (isLoading) return <PageLoader />;

    return (
        <>
            <div className='flex flex-col items-start mb-8'>
                <h2 className='text-lg font-semibold text-primary'>Profile settings</h2>
                <p className='text-tertiary font-normal text-sm'>
                    Manage your team members and their account permissions here.
                </p>
            </div>
            <PersonalInformation userDetails={user} />
            {user?.role === SUPER_ADMIN ? <OrganizationalInformation userDetails={user} /> : ''}
            <BankInformation userID={user?.id ?? ''} />
        </>
    );
};

export default ProfileSettings;
