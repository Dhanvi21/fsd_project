import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ title, image, price, onAddToCart, id }) => {
    const navigate = useNavigate();

    return (
        <div className="product-card">
            <div className="product-image-wrapper" onClick={() => navigate(`/product/${id}`)}>
                <img src={image} alt={title} className="product-image" />
            </div>
            <h3 className="product-title" onClick={() => navigate(`/product/${id}`)}>
                {title}
            </h3>
            <p className="product-price">₹{price}</p>
            <button className="add-to-cart-btn" onClick={(e) => {
                e.stopPropagation(); // prevent triggering navigation
                onAddToCart();
            }}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
