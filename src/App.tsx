import { QueryClient, QueryClientProvider } from "react-query";
import  {AuthProvider}   from "react-auth-kit";
import { AllRoutes } from "./config/routeMgt/AllRoutes";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/shared/theme-provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    },
  },
});



function App() {

  return (
    <AuthProvider authType="localstorage" authName="circula">
      <QueryClientProvider client={queryClient}>
      <Toaster
        richColors
        position="top-right"
        expand={true}
      />
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AllRoutes />
      </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App
