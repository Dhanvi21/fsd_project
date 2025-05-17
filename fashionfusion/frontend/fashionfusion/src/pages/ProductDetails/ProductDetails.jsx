import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { CartContext } from "../../context/CartContext";
import "./ProductDetails.css";
// import { toast } from "react-toastify";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => {
        alert("Product not found");
        navigate("/");
      });
  }, [id]);

  if (!product) return <div className="details-page">Loading...</div>;

  const handleAddToCart = () => {
    if (quantity < 1) return;
    addToCart(product, quantity);
    // toast.success(`${product.name} added to cart`);
  };


  return (
    <div className="details-page">
      <div className="details-card">
        <img src={product.imageUrl} alt={product.name} />
        <div className="details-info">
          <h2>{product.name}</h2>
          <p className="price">₹{product.price}</p>
          <p className="category">Category: {product.category}</p>
          <p>{product.description}</p>

          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </label>

          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
