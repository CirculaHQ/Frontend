import { ModuleHeader } from '@/components/shared';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProfileSettings from './components/ProfileSettings';
import PreferencesSettings from './components/PreferenceSettings';
import AccountSettings from './components/AccountSettings';
import { useSearchParams } from 'react-router-dom';

const tabs = [
  { name: 'Profile', value: 'profile' },
  { name: 'Preferences', value: 'preferences' },
  { name: 'Team', value: 'team' },
  { name: 'Billing', value: 'billing' },
  { name: 'Account', value: 'account' },
]

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get('tab') ?? tabs[0].value

  return (
    <div className='mx-auto'>
      <ModuleHeader title='Settings' className='mb-10' />

      <Tabs defaultValue={currentTab} onValueChange={(tab) => setSearchParams({ tab })}>
        <TabsList className='flex space-x-4 justify-start mb-8'>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`px-4 py-2 font-medium text-gray-500 rounded-md hover:bg-gray-100 focus:bg-gray-100 focus:outline-none`}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value='profile'>
          <ProfileSettings />
        </TabsContent>

        <TabsContent value='preferences'>
          <PreferencesSettings />
        </TabsContent>

        <TabsContent value='team'>
          <p>team</p>
        </TabsContent>

        <TabsContent value='billing'>
          <p>billing</p>
        </TabsContent>

        <TabsContent value='account'>
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
