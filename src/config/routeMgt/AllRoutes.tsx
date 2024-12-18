import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Layout } from '@/components/shared';
import Login from '@/features/authentication/pages/Login';
import Inventory from '@/features/inventory';
import Settings from '@/features/settings/pages/Settings';
import Customers from '@/features/contact/customers';
import Vendors from '@/features/contact/vendors';
import Operations from '@/features/operations';
import Reports from '@/features/reports';
import Dashboard from '@/features/dashboard';
import AddVendor from '@/features/contact/vendors/AddVendor';
import { GlobalContextProvider } from '@/stateManagement/GlobalContext';
import { appRoute } from './routePaths';
import Signup from '@/features/authentication/pages/Signup';
import SignupConfirmation from '@/features/authentication/pages/SignupConfirmation';
import LoginConfirmation from '@/features/authentication/pages/LoginConfirmation';
import ForgotPassword from '@/features/authentication/pages/ForgotPassword';
import ResetPassword from '@/features/authentication/pages/ResetPassword';
import { RequireAuth } from 'react-auth-kit';
import Invoice from '@/features/invoice';

// Separate arrays for authenticated and public routes
const authenticatedRoutes = [
  {
    path: appRoute.home,
    element: <Dashboard />,
  },
  {
    path: appRoute.invoice,
    element: <Invoice />,
  },
  {
    path: appRoute.operations,
    element: <Operations />,
  },
  {
    path: appRoute.settings,
    element: <Settings />,
  },
  {
    path: appRoute.customers,
    element: <Customers />,
  },
  {
    path: appRoute.inventory,
    element: <Inventory />,
  },
  {
    path: appRoute.vendors,
    element: <Vendors />,
  },
  {
    path: appRoute.reports,
    element: <Reports />,
  },
  {
    path: appRoute.add_vendor,
    element: <AddVendor />,
  },
];

const publicRoutes = [
  {
    path: appRoute.login_in,
    element: <Login />,
  },
  {
    path: appRoute.sign_up,
    element: <Signup />,
  },
  {
    path: appRoute.sign_up_confirmation,
    element: <SignupConfirmation />,
  },
  {
    path: appRoute.login_confirmation,
    element: <LoginConfirmation />,
  },
  {
    path: appRoute.forgot_password,
    element: <ForgotPassword />,
  },
  {
    path: appRoute.reset_password,
    element: <ResetPassword />,
  },
];

export const AllRoutes = () => {
  return (
    <Router>
      <GlobalContextProvider>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) => (
            <Route key={`public-${index}`} path={route.path} element={route.element} />
          ))}

          {/* Protected Routes */}
          {authenticatedRoutes.map((route, index) => (
            <Route
              key={`protected-${index}`}
              path={route.path}
              element={
                <Layout>
                  <RequireAuth loginPath={appRoute.login_in}>{route.element}</RequireAuth>
                </Layout>
              }
            />
          ))}
        </Routes>
      </GlobalContextProvider>
    </Router>
  );
};
