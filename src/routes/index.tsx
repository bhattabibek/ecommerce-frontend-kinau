// AppRoutes.tsx
import ProductDetailPage from "@/components/ui/ProductDetail";
import DashboardLayout from "@/layout/DashboardLayout";
import Layout from "@/layout/Layout";
import Cart from "@/pages/cart";
import Shop from "@/pages/Category";
import CheckoutPage from "@/pages/checkout/Checkout";
import Collection from "@/pages/collection";
import Dashboard from "@/components/ui/Dashboard"; // Updated Dashboard import
import ForgotPassword from "@/pages/Forgot-password";
import HomePage from "@/pages/homepage";
import Login from "@/pages/Login/Login";
import Order from "@/pages/orders/Orders";
import ProfilePage from "@/pages/profile/Profile";
import ShippingAddressPage from "@/pages/ShippingAddress";
import Wishlist from "@/pages/wishlist";
import AuthGuard from "@/providers/auth.provider";

import { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import AdminPage from "@/pages/Adminpage";
import AdminLayout from "@/layout/AdminLayout";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Layout>
            <Outlet />
          </Layout>
        </Suspense>
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: "about", element: <>About</> },
        { path: "collection", element: <Collection /> },
        {
          path: "auth",
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Outlet />
            </Suspense>
          ),
          children: [
            { index: true, element: <>Auth</> },
            { path: "forgot-password", element: <ForgotPassword /> },
            { path: "ProductDetailPage", element: <ProductDetailPage /> },
            { path: "checkout", element: <CheckoutPage /> },
            {
              path: "dashboard",
              element: (
                <Suspense fallback={<h1>Loading...</h1>}>
                  <DashboardLayout>
                    <Outlet />
                  </DashboardLayout>
                </Suspense>
              ),
              children: [
                { index: true, element: <Dashboard /> },
                { path: "profile", element: <ProfilePage /> },
                { path: "wishlist", element: <Wishlist /> },
                { path: "orders", element: <Order /> },
                { path: "shipping", element: <ShippingAddressPage /> },
              ],
            },
            { path: "category", element: <Shop /> },
          ],
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <AuthGuard>
                <Cart />
              </AuthGuard>
            </Suspense>
          ),
        },
        {
          path: "wishlist",
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Wishlist />
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Login />
            </Suspense>
          ),
        },
        { path: "*", element: <>Not Found</> },
      ],
    },
    {
      path:"/admin",
      element:(
        <Suspense fallback={<h1>Loading...</h1>}>
          <AdminLayout>
            <Outlet/>
          </AdminLayout>
        </Suspense>
      ),
      children:[
        {index: true, element:<AdminPage/>},
      ]
    }
  ]);

  return routes;
};

export default AppRoutes;
