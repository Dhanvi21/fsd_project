import React from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYou.css";

const ThankYou = () => {
    const navigate = useNavigate();

    return (
        <div className="thank-you-container">
            <h1>🎉 Thank you for your purchase!</h1>
            <p>Your order has been placed successfully.</p>
            <div className="thank-you-buttons">
                <button onClick={() => navigate("/products")}>Continue Shopping</button>
                <button onClick={() => navigate("/orders")}>View Your Orders</button>
            </div>
        </div>
    );
};

export default ThankYou;
