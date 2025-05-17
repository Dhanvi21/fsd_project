import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = React.useContext(CartContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // "CUSTOMER" or "SELLER"

  const totalCount = React.useMemo(() => {
    return Array.isArray(cart) ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  }, [cart]);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      if (token) {
        fetch("http://localhost:8080/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            const raw = data.roles?.[0] || "ROLE_CUSTOMER";
            setRole(raw.replace("ROLE_", ""));
          })
          .catch(() => {
            localStorage.clear();
            setIsLoggedIn(false);
          });
      } else {
        setRole("");
      }
    };

    checkAuth(); // run once initially
    window.addEventListener("storage", checkAuth); // 👈 refresh on login/logout

    return () => window.removeEventListener("storage", checkAuth);
  }, []);


  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>FashionFusion</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        {/* Shop link only for customer */}
        {isLoggedIn && role === "CUSTOMER" && (
          <li><Link to="/products">Shop</Link></li>
        )}

        {/* Profile for customer */}
        {isLoggedIn && role === "CUSTOMER" && (
          <li><Link to="/profile">Profile</Link></li>
        )}

        {/* Dashboard for seller */}
        {isLoggedIn && role === "SELLER" && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/my-products">My Products</Link></li>
          </>
        )}

        {/* Cart only for customers */}
        {isLoggedIn && role === "CUSTOMER" && (
          <li>
            <div className="cart-wrapper" onClick={() => navigate("/cart")}>
              <FiShoppingCart size={22} />
              {totalCount > 0 && (
                <span className="cart-count">{totalCount}</span>
              )}
            </div>
          </li>
        )}

        {/* Login / Logout */}
        {!isLoggedIn ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <li><button onClick={handleLogout} className="nav-logout-btn">Logout</button></li>
        )}

        {!isLoggedIn && (
          <li><Link to="/register">Register</Link></li> // 👈 Add this
        )}
      </ul>

      {/* Seller Register link only if not already a seller */}
      {!isLoggedIn || (isLoggedIn && role !== "SELLER") ? (
        <p className="seller-link">
          Want to sell? <a href="/seller-register">Register as Seller</a>
        </p>
      ) : null}

      {/* Show search only on /products and only for customers */}
      {location.pathname === "/products" && role === "CUSTOMER" && (
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          onChange={(e) => onSearch(e.target.value)}
        />
      )}
    </nav>
  );
};

export default Navbar;
