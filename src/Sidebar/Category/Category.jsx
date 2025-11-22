import React from 'react';
import "../Category/Category.css";
import Side from "../../components/Side";

const Category = ({ handleChange }) => {
  return (
    <div className="mainSidebar">
      <h2 className="sidebar-title">Category</h2>
      <div>
        <Side handleChange={handleChange} value="" title="All" name="category" />
        <Side handleChange={handleChange} value="sneakers" title="Sneakers" name="category" />
        <Side handleChange={handleChange} value="flats" title="Flats" name="category" />
        <Side handleChange={handleChange} value="sandals" title="Sandals" name="category" />
        <Side handleChange={handleChange} value="heels" title="Heels" name="category" />
      </div>
    </div>
  );
};

export default Category;
