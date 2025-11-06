"use client"
import CartItem from "@/types/CartItem-type";
import ProductInterface from "@/types/Product-interface";
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    clearCart : ()=>{},
    cart: [] as CartItem[],
    addToCart: (newItem: ProductInterface) => {},
    ControlProductCount: (item: ProductInterface, action: "increase" | "decrease",count : number) => {},
    deleteFromCart: (item: ProductInterface) => {},
    getTotalPrice: () => { return 0 }
});

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Initialize cart from localStorage only on client side
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        } else {
            localStorage.setItem("cart", '[]');
        }
    }, []);
    function clearCart (){
        localStorage.setItem('cart','[]')
        setCart([])
    }
    function addToCart(newCartItem: ProductInterface) {
	console.log("add to cart called")
        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(({ _id }) => newCartItem._id === _id);
        
        let newCart: CartItem[];
        
        if (existingItemIndex !== -1) {
            // Item exists, increase quantity
            newCart = cart.map((item, index) => 
                index === existingItemIndex 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            // Item doesn't exist, add new item
            newCart = [...cart, { ...newCartItem, quantity: 1 }];
        }
        
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    }

    function ControlProductCount(item: ProductInterface, action: "increase" | "decrease",count : number) {
        const itemIndex = cart.findIndex(({ _id }) => item._id === _id);

        if (itemIndex === -1) return;

        if (action === 'decrease' && cart[itemIndex].quantity === 1) {
            deleteFromCart(item);
            return;
        }

        const newCount = action === 'increase' 
            ? (cart[itemIndex].quantity >= count ? cart[itemIndex].quantity : cart[itemIndex].quantity + 1) 
            : cart[itemIndex].quantity - 1

        const newCart = cart.map((cartItem, index) =>
            index === itemIndex ? { ...cartItem, quantity: newCount } : cartItem
        );

        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    }

    function deleteFromCart(item: ProductInterface) {
        const newCart = cart.filter(({ _id }) => _id !== item._id);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    }

    function getTotalPrice() {
        return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
    }

    const value = {
        clearCart,
        cart,
        addToCart,
        ControlProductCount,
        deleteFromCart,
        getTotalPrice
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}