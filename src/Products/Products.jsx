import React from 'react'
import "../Products/Products.css"


const Products = ({result}) => {
  return (
      <div className="card-container">
      {result}
      </div>
  )
}

export default Products