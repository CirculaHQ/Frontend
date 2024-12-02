import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "@/features/authentication/pages/Login";
import Customers from "@/features/customers/pages/Customers";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import Inventory from "@/features/inventory/pages/Inventory";
import Invoice from "@/features/invoice/pages/Invoice";
import Operations from "@/features/operations/pages/Operations";
import Settings from "@/features/settings/pages/Settings";
import { GlobalContextProvider } from "@/stateManagement/GlobalContext";
import { appRoute } from "./routePaths";
import Signup from "@/features/authentication/pages/Signup";
import SignupConfirmation from "@/features/authentication/pages/SignupConfirmation";
import LoginConfirmation from "@/features/authentication/pages/LoginConfirmation";
import ForgotPassword from "@/features/authentication/pages/ForgotPassword";
import ResetPassword from "@/features/authentication/pages/ResetPassword";

export const AllRoutes = () => {
  return (
    <Router>
      <GlobalContextProvider>
        <Routes>
          <Route path={appRoute.home} element={<Dashboard />} />
          <Route path={appRoute.sign_up} element={<Signup />} />
          <Route path={appRoute.sign_up_confirmation} element={<SignupConfirmation />} />
          <Route path={appRoute.login_confirmation} element={<LoginConfirmation />} />
          <Route path={appRoute.forgot_password} element={<ForgotPassword />} />
          <Route path={appRoute.reset_password} element={<ResetPassword />} />
          <Route path={appRoute.login_in} element={<Login />} />
          <Route path={appRoute.invoice} element={<Invoice />} />
          <Route path={appRoute.operations} element={<Operations />} />
          <Route path={appRoute.customers} element={<Customers />} />
          <Route path={appRoute.inventory} element={<Inventory />} />
          <Route path={appRoute.settings} element={<Settings />} />
        </Routes>
      </GlobalContextProvider>
    </Router>
  );
};
