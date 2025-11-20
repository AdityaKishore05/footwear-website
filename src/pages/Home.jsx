import React, { useState, useEffect } from 'react';
import Nav from "../Navigation/Nav.jsx";
import Products from "../Products/Products.jsx";
import Recommended from "../Recommended/Recommended.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import useProducts from "../hooks/useProducts";
import Card from "../components/Card.jsx";
import "../App.css";

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {
        selectedCategory,
        query,
        handleInputChange,
        handleChange,
        handleClick,
        filteredProducts,
    } = useProducts();

    const [scrollDir, setScrollDir] = useState("up");

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateScrollDir = () => {
            const currentScrollY = window.scrollY;

            if (Math.abs(currentScrollY - lastScrollY) < 10) {
                ticking = false;
                return;
            }

            if (currentScrollY > lastScrollY) {
                setScrollDir("down");
            } else {
                setScrollDir("up");
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <div className="app-container">
            <button
                className={`toggle-sidebar-btn ${isSidebarOpen ? 'stay-visible' : scrollDir === 'up' ? 'hide-toggle-btn' : 'show-toggle-btn'
                    }`}
                onClick={() => setIsSidebarOpen(true)}
            >
                ☰
            </button>

            <Sidebar
                handleChange={handleChange}
                show={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="main-content">
                <Nav query={query} handleInputChange={handleInputChange} />
                <Recommended handleClick={handleClick} />
                <Products result={filteredProducts.map(({ img, title, star, reviews, prevPrice, newPrice }) => (
                    <Card
                        key={title}
                        img={img}
                        title={title}
                        star={star}
                        reviews={reviews}
                        newPrice={newPrice}
                        prevPrice={prevPrice}
                    />
                ))} />
            </main>
        </div>
    );
};

export default Home;
