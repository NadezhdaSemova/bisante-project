
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/productCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className='product-img'><img src={product.image} alt={product.name} /></div>
      <div className='product-info'><h3>{product.name}</h3>
      <p><strong>Цена:</strong> {product.price.toFixed(2)} лв. / {(product.price / 1.95583).toFixed(2)} €</p></div>
      
      <Link to={`/products/${product._id}`} className="btn">Детайли</Link>
    </div>
  );
};

export default ProductCard;
