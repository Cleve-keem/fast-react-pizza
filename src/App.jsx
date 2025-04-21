import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/ui/Home";
import Menu from "./features/menu/Menu";
import AppLayout from "./ui/AppLayout";
import Cart from "./features/cart/Cart";
import Order from "./features/order/Order";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order",
        element: <Order />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
