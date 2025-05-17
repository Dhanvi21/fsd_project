// src/pages/Checkout/Checkout.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
    const [form, setForm] = useState({
        name: "",
        address: "",
        city: "",
        postalCode: "",
        paymentMethod: "cod"
    });

    const navigate = useNavigate();

    const cartTotal = 3297; // Placeholder

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Order placed successfully!");
        navigate("/order-summary");
    };

    return (
        <div className="checkout-page">
            <form className="checkout-form" onSubmit={handleSubmit}>
                <h2>Checkout</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={form.name}
                    onChange={handleChange}
                />
                <textarea
                    name="address"
                    placeholder="Delivery Address"
                    required
                    value={form.address}
                    onChange={handleChange}
                ></textarea>
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    value={form.city}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    required
                    value={form.postalCode}
                    onChange={handleChange}
                />

                <label>Payment Method</label>
                <select
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                >
                    <option value="cod">Cash on Delivery</option>
                    <option value="upi">UPI</option>
                    <option value="card">Card</option>
                </select>

                <div className="order-summary">
                    <h3>Total Amount: ₹{cartTotal}</h3>
                </div>

                <button type="submit" className="confirm-btn">
                    Confirm Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;
