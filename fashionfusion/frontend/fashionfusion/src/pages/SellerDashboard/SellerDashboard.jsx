import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "./SellerDashboard.css";

const SellerDashboard = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        api.get("/orders/seller", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch orders:", err.response?.data || err.message);
                if (err.response?.status === 403) {
                    alert("Access denied: You must be a seller or admin.");
                    navigate("/");
                }
            });
    }, [token, navigate]);

    if (orders.length === 0) {
        return <div className="seller-dashboard"><h2>No orders found.</h2></div>;
    }

    return (
        <div className="seller-dashboard">
            <h2>Seller Dashboard - All Orders</h2>
            {orders.map((order) => (
                <div key={order.orderId} className="order-card">
                    <h3>Order #{order.orderId}</h3>
                    <p><strong>Customer:</strong> {order.userEmail || order.email}</p>
                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                    <div className="order-items">
                        {order.items.map((item, i) => (
                            <div key={i} className="order-item">
                                {item.productName} — ₹{item.price} × {item.quantity}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SellerDashboard;
