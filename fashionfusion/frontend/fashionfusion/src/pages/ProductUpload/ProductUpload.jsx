// src/pages/ProductUpload/ProductUpload.jsx
import React, { useState, useEffect } from "react";
import api from "./../../api/api";
import "./ProductUpload.css";

import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const ProductUpload = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!user || !user.roles.includes("ROLE_SELLER")) {
                alert("Access denied. Only sellers can upload products.");
                navigate("/");
            }
        }
    }, [loading, user, navigate]);

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        imageUrl: ""
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/products", product);
            alert("Product uploaded successfully!");
            setProduct({
                name: "",
                price: "",
                description: "",
                category: "",
                imageUrl: ""
            });
        } catch (err) {
            alert("Upload failed. Are you logged in as a seller?");
            console.error(err);
        }
    };

    return (
        <div className="upload-page">
            <form className="upload-form" onSubmit={handleSubmit}>
                <h2>Upload Product</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Product name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={product.imageUrl}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                ></textarea>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default ProductUpload;
