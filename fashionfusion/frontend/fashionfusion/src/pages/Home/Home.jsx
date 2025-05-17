import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Style Meets Simplicity</h1>
          <p>Discover the latest fashion trends at unbeatable prices.</p>
          <div className="hero-buttons">
            <button onClick={() => navigate("/products")}>Shop Now</button>
            <button onClick={() => navigate("/seller-register")}>Become a Seller</button>
          </div>
        </div>
      </section>

      {/* Why Shop Section */}
      <section className="why-shop">
        <h2>Why Shop with FashionFusion?</h2>
        <div className="features">
          <div className="feature-card">
            <h3>🧵 Unique Styles</h3>
            <p>Handpicked clothing with modern and ethnic blends.</p>
          </div>
          <div className="feature-card">
            <h3>🚚 Fast Delivery</h3>
            <p>We deliver your style in 3-5 days anywhere in India.</p>
          </div>
          <div className="feature-card">
            <h3>💬 24/7 Support</h3>
            <p>Friendly team always ready to help you shop better.</p>
          </div>
        </div>
      </section>

      {/* Placeholder for future features */}
      <section className="coming-soon">
        <h2>Coming Soon</h2>
        <p>Get ready for exciting offers, seasonal sales, and curated collections!</p>
      </section>
    </div>
  );
};

export default Home;
