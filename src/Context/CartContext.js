"use client"
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Add to cart
    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item =>
                item.productCode === product.productCode &&
                item.size === product.size &&
                item.color === product.color
            );

            if (existing) {
                // Increase quantity if same product + size + color exists
                return prev.map(item =>
                    item.productCode === product.productCode &&
                        item.size === product.size &&
                        item.color === product.color
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            }

            // Otherwise add new item
            return [...prev, product];
        });
    };

    // Remove from cart
    const removeFromCart = (productCode, size, color) => {
        setCartItems(prev =>
            prev.filter(
                item =>
                    !(item.productCode === productCode && item.size === size && item.color === color)
            )
        );
    };

    // Clear cart
    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
