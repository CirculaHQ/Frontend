import { ModuleHeader } from '@/components/shared';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProfileSettings from './components/ProfileSettings';
import PreferencesSettings from './components/PreferenceSettings';
import AccountSettings from './components/AccountSettings';

const Settings = () => {
  return (
    <div className='md:p-6 mx-auto'>
      <ModuleHeader title='Settings' className='mb-10' />

      <Tabs defaultValue='profile'>
        <TabsList className='flex space-x-4 justify-start mb-8'>
          <TabsTrigger
            value='profile'
            className='px-4 py-2 font-medium text-gray-500 rounded-md hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value='preferences'
            className='px-4 py-2 font-medium text-gray-500 rounded-md hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
          >
            Preferences
          </TabsTrigger>
          <TabsTrigger
            value='account'
            className='px-4 py-2 font-medium text-gray-500 rounded-md hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
          >
            Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value='profile'>
          <ProfileSettings />
        </TabsContent>

        <TabsContent value='preferences'>
          <PreferencesSettings />
        </TabsContent>

        <TabsContent value='account'>
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
