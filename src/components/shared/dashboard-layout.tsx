import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./sidebar"
import Navbar from "./navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        {/* <SidebarTrigger /> */}
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  )
}
