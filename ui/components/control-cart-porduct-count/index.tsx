import { CartContext } from "@/context/cart-context"
import CartItem from "@/types/CartItem-type"
import { useContext } from "react"

export default function ControlCartProductCount({count,item} : {item : CartItem,count : number}){
    const {ControlProductCount} = useContext(CartContext)
    return (
        <div className="flex gap-4" >
            <button className="cursor-pointer duration-200 hover:bg-blue-600 p-2 px-4 bg-blue-500 text-white rounded-md w-[100%]" onClick={()=>ControlProductCount(item,'increase')} >+</button>
            <button>{item.quantity}</button>
            <button className="cursor-pointer duration-200 hover:bg-blue-600 p-2 px-4 bg-blue-500 text-white rounded-md w-[100%]" onClick={()=>ControlProductCount(item,'decrease',count)} >-</button>
        </div>
    )
}