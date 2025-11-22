import React, { useEffect, useState } from 'react';
import '../Recommended/Recommended.css';
import Button from '../components/Button';

const Recommended = ({ handleClick }) => {
  const [scrollDir, setScrollDir] = useState("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;

      // Ignore small layout shifts
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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`recommended-flex ${scrollDir === "down" ? "stick-to-top" : "original-position"}`}>
      <Button onClickHandler={handleClick} value="" title="All Products" />
      <Button onClickHandler={handleClick} value="Dreampairs" title="Dreampairs" />
      <Button onClickHandler={handleClick} value="Puma" title="Puma" />
      <Button onClickHandler={handleClick} value="Nike" title="Nike" />
      <Button onClickHandler={handleClick} value="Vans" title="Vans" />
    </div>
  );
};

export default Recommended;
