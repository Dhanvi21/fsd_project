import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import api from "../../api/api";
import useAuth from "../../hooks/useAuth";
import "./SellerProducts.css";



const SellerProducts = () => {
    const [products, setProducts] = useState([]);
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const fetchProducts = () => {
        api.get("/products?owned=true")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("Failed to load seller products", err));
    };

    useEffect(() => {
        if (!loading && user?.roles.includes("ROLE_SELLER")) {
            fetchProducts();
        }
    }, [loading, user]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await api.delete(`/products/${id}`);
            alert("Product deleted!");
            fetchProducts(); // reload list
        } catch (err) {
            alert("Delete failed");
            console.error(err);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-product/${id}`);
    };

    return (
        <div className="seller-products-page">
            <h2>My Uploaded Products</h2>
            <button className="add-product-btn" onClick={() => navigate("/upload")}>
                + Add New Product
            </button>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card-wrapper">
                        <ProductCard
                            title={product.name}
                            image={product.imageUrl}
                            price={product.price}
                            onAddToCart={() => { }}
                        />
                        <div className="seller-buttons">
                            <button onClick={() => handleEdit(product.id)}>Edit</button>
                            <button onClick={() => handleDelete(product.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default SellerProducts;