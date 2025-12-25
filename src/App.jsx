import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./assets/mui/theme";
import { ThemeProvider } from "@mui/material";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

// pages
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/auth/SignIn";

import Profile from "./pages/auth/Profile";

import Analytics from "./pages/analytics";

import Products from "./pages/products";
import AddProducts from "./pages/products/AddProducts";

import Merchants from "./pages/merchants";
import AddMerchants from "./pages/merchants/AddMerchants";

import Orders from "./pages/orders";
import AddOrders from "./pages/orders/AddOrders";

import Sales from "./pages/sales";
import ViewSalesDetails from "./pages/sales/ViewSalesDetails";

import Prices from "./pages/prices";
import AddPrices from "./pages/prices/AddPrices";

import Returns from "./pages/returns";
import AddReturns from "./pages/returns/AddReturns";

import Users from "./pages/users";
import AddUsers from "./pages/users/AddUsers";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signIn" element={<SignIn />} />
          </Route>
        </Routes>
        <Routes>
          <Route element={<MainLayout />}>
            {/* analytics */}
            <Route path="/analytics" element={<Analytics />} />

            {/* merchants */}
            <Route path="/merchants" element={<Merchants />} />
            <Route path="/merchants/addMerchant" element={<AddMerchants />} />

            {/* products */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/addProduct" element={<AddProducts />} />

            {/* orders */}
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/addOrders" element={<AddOrders />} />

            {/* sales */}
            <Route path="/sales" element={<Sales />} />
            <Route
              path="/sales/viewSalesDetails"
              element={<ViewSalesDetails />}
            />

            {/* payments */}
            <Route path="/prices" element={<Prices />} />
            <Route path="/prices/addPrice" element={<AddPrices />} />

            {/* returns */}
            <Route path="/returns" element={<Returns />} />
            <Route path="/returns/addReturn" element={<AddReturns />} />

            {/* profile */}
            <Route path="/profile" element={<Profile />} />

            {/* users */}
            <Route path="/users" element={<Users />} />
            <Route path="/users/addUsers" element={<AddUsers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
