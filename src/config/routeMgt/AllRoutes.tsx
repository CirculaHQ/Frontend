import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '@/features/authentication/pages/Login';
import Inventory from '@/features/inventory';
import Settings from '@/features/settings/pages/Settings';
import { GlobalContextProvider } from '@/stateManagement/GlobalContext';
import { appRoute } from './routePaths';
import { Layout } from '@/components/shared';
import Customers from '@/features/contact/customers';
import Vendors from '@/features/contact/vendors';
import Operations from '@/features/operations';
import Reports from '@/features/reports';
import Dashboard from '@/features/dashboard';
import Invoices from '@/features/invoice';

export const AllRoutes = () => {
  return (
    <Router>
          <Layout>
      <GlobalContextProvider>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path={appRoute.login_in} element={<Login />} />
            <Route path={appRoute.invoice} element={<Invoices />} />
            <Route path={appRoute.operations} element={<Operations />} />
            <Route path={appRoute.customers} element={<Customers />} />
            <Route path={appRoute.vendors} element={<Vendors />} />
            <Route path={appRoute.inventory} element={<Inventory />} />
            <Route path={appRoute.reports} element={<Reports />} />
            <Route path={appRoute.settings} element={<Settings />} />
        </Routes>
      </GlobalContextProvider>
      </Layout>

    </Router>
  );
};
