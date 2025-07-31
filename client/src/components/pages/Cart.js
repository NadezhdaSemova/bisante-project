import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '../../styles/cart.css';
import { API_BASE_URL } from '../../config';

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleOrder = async () => {
    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      alert('Моля, попълнете всички полета.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          customerAddress: formData.address,
          items: cartItems
        })
      });

      if (res.ok) {
        clearCart(); // изчистваме количката
        navigate('/thank-you');
      } else {
        alert('Възникна грешка при поръчката.');
      }
    } catch (err) {
      console.error(err);
      alert('Сървърна грешка.');
    }
  };

  return (
    <div className="cart">
      <h2>Количка</h2>
      {cartItems.length === 0 ? (
        <p>Количката е празна.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item._id} className="cart-item">
                <div className="item-info">
                  <strong>{item.name}</strong> — {item.price.toFixed(2)} лв. / {(item.price / 1.95583).toFixed(2)} €
                </div>
                <div className="quantity-controls">
                  <button className='btn btn-left' onClick={() => decreaseQuantity(item._id)}>-</button>
                  <span className='quantity'>{item.quantity}</span>
                  <button className='btn btn-right' onClick={() => increaseQuantity(item._id)}>+</button>
                </div>
                <button className="remove-btn btn" onClick={() => removeFromCart(item._id)}>Премахни</button>
              </li>
            ))}
          </ul>

          <div className="order-form">
            <h3>Данни за доставка</h3>
            <input type="text" name="name" placeholder="Име" value={formData.name} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Имейл" value={formData.email} onChange={handleChange} required />
            <textarea name="address" placeholder="Адрес за доставка" value={formData.address} onChange={handleChange} required />

            <p><strong>Общо:</strong> {total.toFixed(2)} лв. / {(total / 1.95583).toFixed(2)} €</p>
            <button className="order-btn btn" onClick={handleOrder}>Поръчай</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;





