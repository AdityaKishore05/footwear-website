import React, { useState } from 'react'
import { FaShoppingBag } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Toast from './Toast';

const Card = ({ img, title, star, reviews, prevPrice, newPrice }) => {
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState(null);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    addToCart({ img, title, newPrice });
    setToastMessage(`Added ${title} to cart!`);
  };

  return (
    <div>
      <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      <section className="card">
        <Link to={`/product/${encodeURIComponent(title)}`} className="card-link">
          <img src={img} alt={title} className="card-img" />
          <div className="card-details">
            <h3 className="card-title">{title}</h3>
            <section className="card-reviews">
              {star} {star}{star}{star}{star}
              <span className="total-reviews">{reviews}</span>
            </section>
            <section className="card-price">
              <div className="price">
                <del>{prevPrice}</del> {newPrice}
              </div>
              <div onClick={handleAddToCart} className="bag">
                <FaShoppingBag className="bag-icon" />
              </div>
            </section>
          </div>
        </Link>
      </section>
    </div>
  )
}

export default Card
