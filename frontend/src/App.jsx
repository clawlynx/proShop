import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import HomePage from "./pages/HomePage";
import SingleProduct from "./pages/SingleProduct";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShippingPage from "./pages/ShippingPage";
import PrivateRoute from "./components/PrivateRoute";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import AdminRoute from "./components/AdminRoute";
import OrderList from "./pages/OrderList";
import ProductsAdminPage from "./pages/ProductsAdminPage";
import ProductEditPage from "./pages/ProductEditPage";
import UsersListPage from "./pages/UsersListPage";
import UserEditAdminPage from "./pages/UserEditAdminPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "page/:pageNumber",
          element: <HomePage />,
        },
        {
          path: "search/:keyword",
          element: <HomePage />,
        },
        {
          path: "search/:keyword/page/:pageNumber",
          element: <HomePage />,
        },
        {
          path: "product/:id",
          element: <SingleProduct />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "",
          element: <PrivateRoute />,
          children: [
            {
              path: "shipping",
              element: <ShippingPage />,
            },
            {
              path: "payment",
              element: <PaymentPage />,
            },
            {
              path: "placeorder",
              element: <PlaceOrderPage />,
            },
            {
              path: "order/:id",
              element: <OrderPage />,
            },
            {
              path: "profile",
              element: <ProfilePage />,
            },
          ],
        },
        {
          path: "admin",
          element: <AdminRoute />,
          children: [
            {
              path: "orderlist",
              element: <OrderList />,
            },
            {
              path: "productlist",
              element: <ProductsAdminPage />,
            },
            {
              path: "productlist/:pageNumber",
              element: <ProductsAdminPage />,
            },
            {
              path: "product/:id/edit",
              element: <ProductEditPage />,
            },
            {
              path: "userlist",
              element: <UsersListPage />,
            },
            {
              path: "user/:id/edit",
              element: <UserEditAdminPage />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
