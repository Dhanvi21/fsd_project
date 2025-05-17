// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import SellerDashboard from "./pages/SellerDashboard/SellerDashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // Main layout (contains Header/Footer + Outlet)
        children: [
            { path: "", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "product/:id", element: <ProductDetails /> },
            { path: "seller", element: <SellerDashboard /> },
        ],
    },
]);

export default router;
