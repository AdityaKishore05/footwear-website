import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { IoArrowBack, IoTrashOutline, IoAdd, IoRemove } from 'react-icons/io5';
import Nav from '../Navigation/Nav';
import "./Cart.css";

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="cart-container">
                <Nav showSearch={false} />
                <div className="cart-empty">
                    <h2 className="cart-empty-title">Your cart is empty</h2>
                    <p className="cart-empty-text">Looks like you haven't added any shoes yet.</p>
                    <Link to="/" className="start-shopping-btn">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <Nav showSearch={false} />
            <div className="cart-content-wrapper">
                <Link to="/" className="continue-shopping-link">
                    <IoArrowBack /> Continue Shopping
                </Link>

                <h1 className="cart-title">Shopping Cart ({cartItems.length})</h1>

                <div className="cart-grid">
                    {/* Cart Items List */}
                    <div className="cart-items-section">
                        {cartItems.map((item) => (
                            <div key={item.title} className="cart-item">
                                <div className="cart-item-image-container">
                                    <Link to={`/product/${encodeURIComponent(item.title)}`}>
                                        <img src={item.img} alt={item.title} className="cart-item-image" />
                                    </Link>
                                </div>

                                <div className="cart-item-details">
                                    <Link to={`/product/${encodeURIComponent(item.title)}`} className="cart-item-link">
                                        <h3 className="cart-item-title">{item.title}</h3>
                                    </Link>
                                    <p className="cart-item-price">{item.newPrice}</p>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => updateQuantity(item.title, item.quantity - 1)}
                                            className="qty-btn"
                                            disabled={item.quantity <= 1}
                                        >
                                            <IoRemove />
                                        </button>
                                        <span className="qty-value">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.title, item.quantity + 1)}
                                            className="qty-btn"
                                        >
                                            <IoAdd />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.title)}
                                        className="remove-btn"
                                        title="Remove item"
                                    >
                                        <IoTrashOutline size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary-section">
                        <div className="order-summary-card">
                            <h2 className="summary-title">Order Summary</h2>

                            <div className="summary-rows">
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span className="free-shipping">Free</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tax</span>
                                    <span>Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="summary-total">
                                <span className="total-label">Total</span>
                                <span className="total-amount">${cartTotal.toFixed(2)}</span>
                            </div>

                            <button className="checkout-btn">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
