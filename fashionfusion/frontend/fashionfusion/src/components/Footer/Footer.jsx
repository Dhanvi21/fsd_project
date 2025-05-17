// src/components/Footer/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h3 className="footer-brand">FashionFusion</h3>
                <ul className="footer-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Shop</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                </ul>
                <p className="footer-contact">Contact: support@fashionfusion.in</p>
                <p className="footer-copy">© {new Date().getFullYear()} FashionFusion. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
