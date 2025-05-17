import React, { createContext, useEffect, useState } from "react";
import api from "../api/api"; // axios instance
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null); // holds the entire response with `items` + `totalAmount`
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const res = await api.get("/cart", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCart(res.data);
        } catch (err) {
            console.error("❌ Failed to fetch cart:", err.response?.data || err.message);
        }
    };

    const addToCart = async (product, quantity) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.warn("Please login to add items to cart.");
            return;
        }

        try {
            await api.post(
                "/cart/add",
                qs.stringify({
                    productId: product.id,
                    quantity: quantity,
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(`${product.name} added to cart`);
            await fetchCart();
        } catch (err) {
            toast.error("Failed to add to cart.");
            console.error("Add to cart failed:", err.response?.data || err.message);
        }
    };


    const removeFromCart = async (productId) => {
        try {
            await api.delete(`/cart/remove?productId=${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await fetchCart();
        } catch (err) {
            console.error("❌ Remove from cart failed:", err.response?.data || err.message);
        }
    };

    const checkout = async () => {
        try {
            await api.post("/orders/checkout", null, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("🎉 Order placed successfully!");
            await fetchCart();
            navigate("/thank-you"); // redirect here
        } catch (err) {
            toast.error("❌ Failed to place order.");
        }
    };



    useEffect(() => {
        if (token) fetchCart();
    }, [token]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, checkout }}>
            {children}
        </CartContext.Provider>
    );
};
