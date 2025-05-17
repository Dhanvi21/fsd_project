import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Login.css";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", form);
            const token = res.data.token;

            localStorage.setItem("token", token);

            // Optional: refresh other parts of app like Navbar
            window.dispatchEvent(new Event("storage"));

            // Fetch role
            const userRes = await api.get("/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const roles = userRes.data.roles;
            const role = roles.includes("ROLE_SELLER") ? "SELLER" : "CUSTOMER";

            alert("Login successful!");

            // Navigate based on role
            if (role === "SELLER") {
                navigate("/my-products");
            } else {
                navigate("/products");
            }
        } catch (err) {
            alert("Login failed. Please check your credentials.");
            console.error(err);
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2>Login</h2>
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
                <button type="submit">Login</button>
                <p>
                    Don’t have an account? <a href="/register">Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
