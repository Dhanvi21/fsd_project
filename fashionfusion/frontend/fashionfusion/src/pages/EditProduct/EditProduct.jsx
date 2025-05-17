// src/pages/EditProduct/EditProduct.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
    description: ""
  });

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        alert("Product not found");
        navigate("/my-products");
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, product);
      alert("Product updated!");
      navigate("/my-products");
    } catch (err) {
      alert("Update failed");
      console.error(err);
    }
  };

  return (
    <div className="edit-page">
      <form className="edit-form" onSubmit={handleUpdate}>
        <h2>Edit Product</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter product name"
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
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
