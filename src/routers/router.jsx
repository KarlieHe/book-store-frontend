import { createBrowserRouter } from "react-router-dom"; 


import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import SingleBook from "../pages/books/SingleBook";
import Cart from "../pages/books/Cart";
import Checkout from "../pages/books/Checkout";
import PaymentPage from "../pages/books/PaymentPage";
import OrderCompletePage from "../pages/books/OrderCompletePage";
import Books from "../pages/books/Books";

import DashboardHome from "../pages/dashboard/DashboardHome";
import Orders from "../pages/dashboard/Orders";
import Inventory from "../pages/dashboard/Inventory";
import Users from "../pages/dashboard/Users";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AddBook from "../pages/dashboard/AddBook";

import CustomerLayout from "../layouts/CustomerLayout";
import MyAccount from "../pages/users/MyAccount";
import OrderList from "../pages/users/OrderList";
import OrderDetails from "../pages/users/OrderDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/books/:genre?", element: <Books /> },
      { path: "/book/:id", element: <SingleBook /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/payment", element: <PaymentPage /> },
      { path: "/order-success", element: <OrderCompletePage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/customer",
        element: <CustomerLayout />,
        children: [
          { path: "profile", element: <MyAccount /> },
          { path: "orders", element: <OrderList /> },
          { path: "orders/:id", element: <OrderDetails /> }, // Assuming you want to view a specific order
          // Add more customer-related pages here
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "orders", element: <Orders /> },
      { path: "inventory", element: <Inventory /> },
      { path: "add-new-book", element: <AddBook /> },
      { path: "users", element: <Users /> },
    ],
  },
]);

export default router;
