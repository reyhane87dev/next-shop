'use client'


import ShopingCartForm from "../cart-form";
import CartItemsList from "../cart-items-list";
import { useContext } from "react";
import { CartContext } from "@/context/cart-context";

export default function FullCartComponent(){
    const {cart,getTotalPrice} = useContext(CartContext)
    let totalPrice = getTotalPrice();

    return (
        <div className="grid md:grid-cols-2 gap-4" >
            <CartItemsList cart={cart} totalPrice={totalPrice} />
            <ShopingCartForm />
        </div>
    )
}