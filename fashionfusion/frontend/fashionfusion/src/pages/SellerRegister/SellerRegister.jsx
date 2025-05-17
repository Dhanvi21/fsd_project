// src/pages/SellerRegister/SellerRegister.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./SellerRegister.css"; // reuse same styling

const SellerRegister = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/seller-signup", form);
            alert("Seller registration successful! Please login.");
            navigate("/login");
        } catch (err) {
            alert("Registration failed.");
            console.error(err);
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleRegister}>
                <h2>Seller Registration</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={form.password}
                    onChange={handleChange}
                />
                <button type="submit">Register as Seller</button>
                <p>
                    Already registered? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
};

export default SellerRegister;
