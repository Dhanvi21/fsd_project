import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import "./Cart.css";

const Cart = () => {
    const { cart, checkout } = useContext(CartContext);

    console.log(cart);


    // Optional: Handle edge case if `cart` is not ready yet
    if (!cart || !Array.isArray(cart.items)) {
        return <div className="cart-container">Loading cart...</div>;
    }

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>

            {cart.items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.items.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="cart-info">
                                <h4>{item.productName}</h4>
                                <p>Price: ₹{item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Total: ₹{item.total}</p>
                            </div>
                        </div>
                    ))}

                    <div className="cart-summary">
                        <h3>Grand Total: ₹{cart.totalAmount}</h3>
                        <button className="checkout-btn" onClick={checkout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
