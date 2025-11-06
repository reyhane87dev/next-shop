'use client'
import { CartContext } from "@/context/cart-context";
import ProductInterface from "@/types/Product-inteface";
import { useContext } from "react";

export default function DeleteFromCartButton({item} : {item : ProductInterface}){
    const {deleteFromCart} = useContext(CartContext)
    return (
        <button className="cursor-pointer duration-200 hover:bg-blue-600 p-2 px-4 bg-blue-500 text-white rounded-md" onClick={()=>deleteFromCart(item)} >حذف از سبد خرید</button>
    )
}