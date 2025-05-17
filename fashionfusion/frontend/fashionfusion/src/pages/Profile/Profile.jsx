import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");

    api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setEmail(res.data.email);
        const rawRole = res.data.roles?.[0] || "ROLE_CUSTOMER";
        setRole(rawRole.replace("ROLE_", ""));
      })
      .catch((err) => {
        console.error("Failed to fetch profile", err);
        navigate("/login");
      });
  }, [token, navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Role:</strong> {role}</p>

      {role === "CUSTOMER" && (
        <button onClick={() => navigate("/orders")}>View My Orders</button>
      )}
      {role === "SELLER" && (
        <button onClick={() => navigate("/seller/products")}>Seller Dashboard</button>
      )}

      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
