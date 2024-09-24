import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (producto, quantity) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find(item => item.id === producto.id);
            if (itemExists) {
                // If the item already exists in the cart, update the quantity
                return prevItems.map(item =>
                    item.id === producto.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // If the item is new, add it with the specified quantity
                return [...prevItems, { ...producto, quantity }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
