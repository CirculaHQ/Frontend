import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './sidebar';
import Navbar from './navbar';
import { TooltipProvider } from '../ui/tooltip';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        <Navbar />
        <TooltipProvider>
          <div className='mx-auto mt-8 px-4 md:px-6 pb-6 w-full max-w-full md:max-w-[90%]'>
            {children}
          </div>
        </TooltipProvider>
      </main>
    </SidebarProvider>
  );
};

export { Layout };
