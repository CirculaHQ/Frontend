import { QueryClient, QueryClientProvider } from "react-query";
import  AuthProvider  from "react-auth-kit";
import { AllRoutes } from "./config/routeMgt/AllRoutes";
import createStore from "react-auth-kit/createStore";
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

const store = createStore({
  authName: "circula", 
  authType: "localstorage", 
});

function App() {

  return (
    <AuthProvider store={store}>
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
