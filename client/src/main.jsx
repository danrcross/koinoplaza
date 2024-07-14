import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import CommunitiesPage from "./pages/CommunitiesPage.jsx";
import SingleCommunityPage from "./pages/SingleCommunityPage.jsx";
import SingleProductPage from "./pages/SingleProductPage.jsx";
import NewProductPage from "./pages/NewProductPage.jsx";
import NewCommunityPage from "./pages/NewCommunityPage.jsx";
import JoinCommunityPage from "./pages/JoinCommunityPage.jsx";
import OrderSummaryPage from "./pages/OrderSummaryPage.jsx";
// import OrderSummaryPage from "./pages/OrderSummaryPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/communities",
        element: <CommunitiesPage />,
      },
      {
        path: "/joincommunity",
        element: <JoinCommunityPage />,
      },

      {
        path: "/communities/:communityId",
        element: <SingleCommunityPage />,
      },
      {
        path: "/products/:productId",
        element: <SingleProductPage />,
      },
      {
        path: "/newproduct",
        element: <NewProductPage />,
      },
      {
        path: "/newcommunity",
        element: <NewCommunityPage />,
      },
      {
        path: "/products/:productId/ordersummary",
        element: <OrderSummaryPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
