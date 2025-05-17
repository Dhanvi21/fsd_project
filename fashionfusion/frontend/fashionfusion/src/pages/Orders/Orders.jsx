import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get("/orders/my", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err.response?.data || err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="orders-container">Loading your orders...</div>;

  if (orders.length === 0) return <div className="orders-container">You haven't placed any orders yet.</div>;

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order.orderId} className="order-card">
          <h3>Order #{order.orderId}</h3>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
          <div className="order-items">
            {order.items.map((item, i) => (
              <div key={i} className="order-item">
                <p>{item.productName} — ₹{item.price} × {item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
