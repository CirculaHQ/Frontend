import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './sidebar';
import Navbar from './navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Navbar />
        <div className="mx-auto mt-8 px-4 md:px-6 w-full max-w-full md:max-w-[96%]">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export { Layout };
