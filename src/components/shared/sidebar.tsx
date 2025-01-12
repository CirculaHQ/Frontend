import Logo from '@/assets/images/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Icon,
  SidebarFooter,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSignOut } from 'react-auth-kit';
import { appRoute } from '@/config/routeMgt/routePaths';
import { useEffect, useState } from 'react';
import { getUserProfile, UserProfile } from '@/hooks/api/mutations/settings/user-profile';

const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: 'dashboard',
  },
  {
    title: 'Operations',
    url: '/operations',
    icon: 'operations',
  },
  {
    title: 'Inventory',
    url: '/inventory',
    icon: 'inventory',
  },
  {
    title: 'Invoices',
    url: '/invoices',
    icon: 'invoices',
  },
  {
    title: 'Contacts',
    url: '#',
    icon: 'contacts',
    subItems: [
      {
        title: 'Vendors',
        url: '/vendors',
      },
      {
        title: 'Customers',
        url: '/customers',
      },
    ],
  },
  {
    title: 'Reports',
    url: '/reports',
    icon: 'reports',
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: 'settings',
  },
];

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const signOut = useSignOut();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isParentActive = (item: (typeof items)[0]) => {
    if (item.subItems) {
      return item.subItems.some((subItem) => location.pathname === subItem.url);
    }
    return location.pathname === item.url;
  };

  const handleNavigation = (url: string) => {
    if (url !== '#') {
      navigate(url);
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate(appRoute.login_in, { replace: true });
  };

  return (
    <Sidebar className='bg-white border-l border-l-[#E9EAEB]' side={isMobile ? 'right' : 'left'}>
      <SidebarContent className='pt-5 pr-5 bg-white'>
        <SidebarGroup>
          <SidebarGroupLabel className='mb-6'>
            <img src={Logo} width={100} height={128} alt='Logo' />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='gap-2 flex-col items-start flex'>
              {items.map((item) =>
                item.subItems ? (
                  <Collapsible
                    key={item.title}
                    defaultOpen={isParentActive(item)}
                    className='group/collapsible w-full'
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`text-tertiary font-inter text-sm w-full justify-between`}
                          isActive={isParentActive(item)}
                        >
                          <div className='flex items-center gap-2 '>
                            <Icon
                              name={item.icon}
                              className={`w-[18px] h-[18px] font-medium`}
                              fill='none'
                            />
                            <span className='font-medium'>{item.title}</span>
                          </div>
                          <ChevronDown className='w-4 h-4 transition-transform group-data-[state=open]/collapsible:rotate-180' />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className='mt-1'>
                        <SidebarMenuSub className='relative'>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem
                              key={subItem.title}
                              onClick={() => {
                                handleNavigation(subItem.url), isMobile && toggleSidebar();
                              }}
                              className={cn(
                                'text-tertiary font-inter text-sm w-full justify-between px-2 py-1.5 cursor-pointer',
                                isActive(subItem.url) &&
                                  ' bg-[#FAFAFA] rounded-[4px] text-secondary_hover font-medium'
                              )}
                            >
                              {isActive(subItem.url) && (
                                <div className='absolute bg-[#2C6000] w-[2px] h-2 rounded-full mt-2 left-0 ml-[-1.5px]' />
                              )}
                              {subItem.title}
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title} className='w-full'>
                    <SidebarMenuButton
                      onClick={() => {
                        handleNavigation(item.url), isMobile && toggleSidebar();
                      }}
                      className={`text-tertiary font-inter text-sm w-full`}
                      isActive={isActive(item.url)}
                    >
                      <Icon
                        name={item.icon}
                        className={`w-[18px] h-[18px] font-medium ${
                          isActive(item.url) ? 'text-secondary_hover' : ''
                        }`}
                        fill='none'
                      />
                      <span className='font-medium'>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {userProfile ? (
                    <>
                      {/* <img 
                        src={userProfile.picture} 
                        alt="Profile" 
                        className="w-6 h-6 rounded-full mr-2" 
                      /> */}

                      <div>
                        <p className='text-primary font-semibold'>
                          {userProfile.first_name} {userProfile.last_name}
                        </p>
                        <p className='text-tertiary font-normal text-sm'>{userProfile.email}</p>
                      </div>
                    </>
                  ) : (
                    'Username'
                  )}
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
