// src/pages/OrderSummary/OrderSummary.jsx
import React from "react";
import "./OrderSummary.css";
import { Link } from "react-router-dom";

const OrderSummary = () => {
  const fakeOrderId = Math.floor(Math.random() * 900000 + 100000); // temporary

  return (
    <div className="order-summary-page">
      <div className="summary-card">
        <h2>Thank You for Your Order!</h2>
        <p>Your order ID is <strong>#{fakeOrderId}</strong></p>
        <p>We’ll deliver your items in 3–5 business days.</p>
        <Link to="/products" className="shop-more-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
