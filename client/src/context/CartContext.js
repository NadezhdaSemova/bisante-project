import React, { createContext, useContext, useState } from 'react';


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item._id === product._id);
      const quantityToAdd = product.quantity ?? 1;

      if (existing) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + quantityToAdd } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: quantityToAdd }];
      }
    });
  };

  const clearCart = () => setCartItems([]);
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item._id !== productId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Увеличаване на количеството
  const increaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Намаляване на количеството
  const decreaseQuantity = (id) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalItems, getTotalPrice, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );


};



export const useCart = () => useContext(CartContext);
