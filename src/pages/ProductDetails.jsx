import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../db/Data';
import { useCart } from '../context/CartContext';
import { IoArrowBack } from 'react-icons/io5';
import { BsFillBagFill } from 'react-icons/bs';
import Toast from '../components/Toast';
import Nav from '../Navigation/Nav';
import "./ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const product = data.find(p => p.title === decodeURIComponent(id));
    const { addToCart } = useCart();
    const [toastMessage, setToastMessage] = useState(null);

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Product not found</h2>
                <Link to="/">Go back to shopping</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
        setToastMessage(`Added ${product.title} to cart!`);
    };

    return (
        <div className="product-details-container">
            <Nav showSearch={false} />
            <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />

            <Link to="/" className="back-link">
                <IoArrowBack /> Back to Shopping
            </Link>

            <div className="product-content">
                <div className="product-image-section">
                    <img src={product.img} alt={product.title} className="product-image" />
                </div>

                <div className="product-info-section">
                    <h1 className="product-title">{product.title}</h1>

                    <div className="product-rating">
                        <span className="stars">
                            {product.star} {product.star} {product.star} {product.star}
                        </span>
                        <span className="reviews">({product.reviews} reviews)</span>
                    </div>

                    <div className="product-price">
                        <span className="prev-price">{product.prevPrice}</span>
                        <span className="new-price">{product.newPrice}</span>
                    </div>

                    <p className="product-description">
                        Experience ultimate comfort and style with the {product.title}.
                        Designed for performance and durability, this shoe features premium materials
                        and advanced cushioning technology.
                    </p>

                    <div className="product-actions">
                        <button onClick={handleAddToCart} className="add-to-cart-btn">
                            <BsFillBagFill /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
