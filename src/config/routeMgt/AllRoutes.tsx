import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '@/features/authentication/pages/Login';
import Dashboard from '@/features/dashboard/pages/Dashboard';
import Inventory from '@/features/inventory/pages/Inventory';
import Invoice from '@/features/invoice/pages/Invoice';
import Operations from '@/features/operations/pages/Operations';
import Settings from '@/features/settings/pages/Settings';
import { GlobalContextProvider } from '@/stateManagement/GlobalContext';
import { appRoute } from './routePaths';
import Customers from '@/features/contact/customers';
import { Layout } from '@/components/shared';
import Vendors from '@/features/contact/vendors';

export const AllRoutes = () => {
  return (
    <Router>
          <Layout>
      <GlobalContextProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path={appRoute.login_in} element={<Login />} />
            <Route path={appRoute.invoice} element={<Invoice />} />
            <Route path={appRoute.operations} element={<Operations />} />
            <Route path={appRoute.customers} element={<Customers />} />
            <Route path={appRoute.vendors} element={<Vendors />} />
            <Route path={appRoute.inventory} element={<Inventory />} />
            <Route path={appRoute.settings} element={<Settings />} />
        </Routes>
      </GlobalContextProvider>
      </Layout>

    </Router>
  );
};
