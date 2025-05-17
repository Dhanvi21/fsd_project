// src/pages/Register/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./../../api/api";
import "./Register.css";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const customerData = { ...form, role: "CUSTOMER" }; // ✅ role enforced in frontend

        try {
            await api.post("/auth/signup", customerData);
            alert("Registration successful!");
            navigate("/login");
        } catch (err) {
            alert("Registration failed. Try again.");
            console.error(err);
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleRegister}>
                <h2>Register</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    required
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    required
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    required
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
};

export default Register;
