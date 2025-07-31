// src/components/pages/Products.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../pages/ProductCard.js';
import '../../styles/products.css';
import { API_BASE_URL } from '../../config.js';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error loading products:', err));
  }, []);

  
  return (
    <div className="products-container">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;






