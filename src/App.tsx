import { QueryClient, QueryClientProvider } from "react-query";
import  {AuthProvider }   from "react-auth-kit";
import { AllRoutes } from "./config/routeMgt/AllRoutes";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/shared/theme-provider";
// import refreshAccessToken from "./hooks/api/mutations/authentication/refreshAccessToken";
import "./global.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    },
  },
});

// const refreshApi = createRefresh({
//   interval: 60,   // Refresh every 60 minutes
//   refreshApiCallback: async ({
//     refreshToken,
//   }) => {
//     try {
//       const response = await refreshAccessToken(refreshToken!);
//       if (response.status === 200) {
//         return {
//           isSuccess: true,
//           newAuthToken: response.data.access,
//           newAuthTokenExpireIn: 60,
//           newRefreshToken: refreshToken, 
//           newRefreshTokenExpiresIn: 60 
//         };
//       } else {
//           return {
//             isSuccess: false,
//             newAuthToken: '',
//             newAuthTokenExpireIn: 0,
//             newRefreshToken: '',
//             newRefreshTokenExpiresIn: 0,
//           };
//         }
//     }
//     catch (error) {
//       console.error(error);
//       return {
//         isSuccess: false,
//         newAuthToken: '',
//         newAuthTokenExpireIn: 0,
//         newRefreshToken: '',
//         newRefreshTokenExpiresIn: 0,
//       };
//     }
//   }
// })

function App() {

  return (
    <AuthProvider authType="localstorage" authName="circula" >
      <QueryClientProvider client={queryClient}>
      <Toaster
        richColors
        position="top-right"
        expand={true}
      />
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AllRoutes />
      </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App
