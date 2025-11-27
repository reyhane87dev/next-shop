'use client'
import { CartContext } from "@/context/cart-context";
import ProductInterface from "@/types/Product-inteface";
import { useContext } from "react";

export default function AddToCartButton({item} : {item : string}){
    let itemConvertedToObject :  ProductInterface = JSON.parse(item)

    const {addToCart} = useContext(CartContext);
    function handleOnclick (){
	addToCart(itemConvertedToObject);
	alert("محصول به سبد خرید اضافه شد")
    }
    return (
        <button className="cursor-pointer duration-200 hover:bg-blue-600 p-2 px-4 bg-blue-500 text-white rounded-md" onClick={handleOnclick} >
            افرودن به سبد خرید
        </button>
    )
}