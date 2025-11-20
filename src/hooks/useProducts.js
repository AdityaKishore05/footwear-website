import { useState, useMemo } from 'react';
import data from '../db/Data';

const useProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "category") {
      setSelectedCategory(value);
    } else if (name === "price") {
      setSelectedPrice(value);
    }
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = useMemo(() => {
    let filtered = data;

    // Text Search
    if (query) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Price filtering
    if (selectedPrice !== "") {
      filtered = filtered.filter(({ newPrice }) => {
        const priceValue = parseFloat(newPrice.toString().replace('$', ''));
        const selectedValue = parseFloat(selectedPrice);

        switch (selectedValue) {
          case 50:
            return priceValue >= 0 && priceValue <= 50;
          case 100:
            return priceValue > 50 && priceValue <= 100;
          case 150:
            return priceValue > 100 && priceValue <= 150;
          case 200:
            return priceValue > 150;
          default:
            return true;
        }
      });
    }

    // Category filtering
    if (selectedCategory !== "") {
      filtered = filtered.filter(({ category: cat, color, company, title }) =>
        cat === selectedCategory ||
        color === selectedCategory ||
        company === selectedCategory ||
        title === selectedCategory
      );
    }

    return filtered;
  }, [query, selectedCategory, selectedPrice]);

  return {
    selectedCategory,
    selectedPrice,
    query,
    handleInputChange,
    handleChange,
    handleClick,
    filteredProducts,
  };
};

export default useProducts;
