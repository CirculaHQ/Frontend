import { QueryClient, QueryClientProvider } from "react-query";
import  AuthProvider  from "react-auth-kit";
import { AllRoutes } from "./config/routeMgt/AllRoutes";
import createStore from "react-auth-kit/createStore";
import { Toaster } from "sonner";

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
        <AllRoutes />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App
