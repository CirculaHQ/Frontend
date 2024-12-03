import Logo from '@/assets/images/logo.png';

import {
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
} from '@/components/ui';
import { ChevronDown } from 'lucide-react';
// Menu items unchanged
const items = [
  {
    title: 'Dashboard',
    url: '#',
    icon: 'dashboard',
  },
  {
    title: 'Operations',
    url: '#',
    icon: 'operations',
  },
  {
    title: 'Inventory',
    url: '#',
    icon: 'inventory',
  },
  {
    title: 'Invoices',
    url: '#',
    icon: 'invoices',
  },
  {
    title: 'Contacts',
    url: '#',
    icon: 'contacts',
    subItems: [
      {
        title: 'Vendors',
        url: '#',
      },
      {
        title: 'Customers',
        url: '#',
      },
    ],
  },
  {
    title: 'Reports',
    url: '#',
    icon: 'reports',
  },
  {
    title: 'Settings',
    url: '#',
    icon: 'settings',
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-white border-l border-l-[#E9EAEB]">
      <SidebarContent className="pt-5 pr-5 bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-6">
            <img src={Logo} width={100} height={128} />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 flex-col items-start flex">
              {items.map((item) =>
                item.subItems ? (
                  <Collapsible
                    key={item.title}
                    defaultOpen
                    className="group/collapsible w-full"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="text-tertiary font-inter text-sm w-full justify-between">
                          <div className="flex items-center gap-2">
                            <Icon
                              name={item.icon}
                              className="w-[18px] h-[18px] font-medium"
                              fill="none"
                            />
                            <span className="font-medium">{item.title}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <a
                                href={subItem.url}
                                className="text-tertiary font-inter text-sm pl-8"
                              >
                                {subItem.title}
                              </a>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="text-tertiary font-inter text-sm"
                    >
                      <a href={item.url}>
                        <Icon
                          name={item.icon}
                          className="w-[18px] h-[18px] font-medium"
                          fill="none"
                        />
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
