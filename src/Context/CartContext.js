import React, { createContext, useContext, useState, useEffect } from 'react';

const CART_STORAGE_KEY = 'cartItems';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error('Error parsing cart data from local storage', error);
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem(CART_STORAGE_KEY);
    } else {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      return updatedCart;
    });
  };

  const isProductInCart = (productId) => cart.some(item => item.id === productId);

  const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isProductInCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);