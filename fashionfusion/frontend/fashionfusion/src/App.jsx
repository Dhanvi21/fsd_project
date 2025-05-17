// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ProductList from './pages/ProductList/ProductList';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderSummary from './pages/OrderSummary/OrderSummary';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import OrderHistory from './pages/Orders/Orders';
import ProductUpload from "./pages/ProductUpload/ProductUpload";
import SellerProducts from "./pages/SellerProducts/SellerProducts";
import SellerRegister from "./pages/SellerRegister/SellerRegister";
import EditProduct from "./pages/EditProduct/EditProduct";
import ThankYou from "./pages/ThankYou/ThankYou";
import SellerDashboard from "./pages/SellerDashboard/SellerDashboard";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar onSearch={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList searchTerm={searchTerm} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/upload" element={<ProductUpload />} />
        <Route path="/my-products" element={<SellerProducts />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />

        <Route path="/thank-you" element={<ThankYou />} />


        <Route path="/dashboard" element={<SellerDashboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
