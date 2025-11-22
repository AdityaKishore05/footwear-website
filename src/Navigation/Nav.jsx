import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../Navigation/Nav.css";

const Nav = ({ query, handleInputChange, showSearch = true }) => {
  const [show, setShow] = useState(true);
  const { cartItems } = useCart();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }

      if (currentScrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <nav className={`nav ${show ? "show" : "hide"}`}>
      <div className="nav-container">
        {showSearch && (
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for Shoes"
            className="search-input"
          />
        )}
      </div>

      <div className="profile-container">
        <Link to="/cart" className="cart-icon-container">
          <AiOutlineShoppingCart className="nav-icons" />
          {cartItems.length > 0 && (
            <span className="cart-badge">{cartItems.length}</span>
          )}
        </Link>

        <button onClick={toggleDarkMode} className="dark-mode-btn">
          {darkMode ? <MdLightMode className="nav-icons" /> : <MdDarkMode className="nav-icons" />}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
