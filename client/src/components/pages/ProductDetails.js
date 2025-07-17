
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error('Error loading product:', err));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
    }
  };

  if (!product) return <p>Зареждане...</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />

      <div className="product-info">
        <h2>{product.name}</h2>
        <p><strong>Цвят:</strong> {product.color}</p>
        <p><strong>Цена:</strong> {product.price.toFixed(2)} лв. / {(product.price / 1.95583).toFixed(2)} €</p>
        <p><strong>Сорт:</strong> {product.grape}</p>
        <p><strong>Реколта:</strong> {product.vintage}</p>
        <p><strong>Тип бутилка:</strong> {product.bottleType}</p>
        <p><strong>Алкохол:</strong> {product.alcohol}</p>
        <p>{product.description}</p>

        <label>
          Количество:
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </label>

        <button className='btn' onClick={handleAddToCart}>Добави в количката</button>
      </div>
    </div>
  );

};

export default ProductDetails;