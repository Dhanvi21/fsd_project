import React, { useEffect, useState, useContext } from "react";
import api from "../../api/api";
import ProductCard from "../../components/ProductCard/ProductCard";
import { CartContext } from "../../context/CartContext";
// import { toast } from "react-toastify";
import "./ProductList.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        api.get("/products")
            .then((res) => {
                setProducts(res.data);
                setFiltered(res.data);

                const cats = [...new Set(res.data.map((p) => p.category).filter(Boolean))];
                setCategories(cats);
            })
            .catch((err) => console.error("Failed to fetch products", err));
    }, []);

    useEffect(() => {
        let result = [...products];

        if (selectedCategory) {
            result = result.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());
        }

        if (minPrice) result = result.filter((p) => p.price >= parseFloat(minPrice));
        if (maxPrice) result = result.filter((p) => p.price <= parseFloat(maxPrice));

        setFiltered(result);
    }, [selectedCategory, minPrice, maxPrice, products]);

    return (
        <div className="ProductList-page">
            <h2>All Products</h2>

            <div className="filter-bar">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />

                <button onClick={() => {
                    setSelectedCategory("");
                    setMinPrice("");
                    setMaxPrice("");
                }}>
                    Reset
                </button>
            </div>

            <div className="product-grid">
                {filtered.length === 0 ? (
                    <p>No products match your filters.</p>
                ) : (
                    filtered.map((product) => (
                        <ProductCard
                            key={product.id}
                            title={product.name}
                            image={product.imageUrl}
                            price={product.price}
                            id={product.id}
                            onAddToCart={() => {
                                addToCart(product, 1);
                                // toast.success(`${product.name} added to cart`);
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;
