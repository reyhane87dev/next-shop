import ProductInterface from "@/types/Product-inteface"
import Image from 'next/image'
import DeleteFromCartButton from "../delete-from-cart-button"
import ControlCartProductCount from "../control-cart-porduct-count"
import CartItem from "@/types/CartItem-type"
import Link from 'next/link'
export default function CartItemsList ({cart,totalPrice} : {totalPrice : number,cart : CartItem[]}){
    console.log('cart',cart)
    return (
        <div className="bg-white p-4 rounded-lg" >
            <h2 className="text-2xl pb-5 " >
                سبد خرید
            </h2>
            {
                cart.length === 0 ? (
                    <div>
                        سبد خرید خالی است
                    </div>
                ) : (
                    <>
                        <ul className="flex flex-col gap-4 " >
                            {
                                cart.map((product)=>{
                                    return (
                                        <li key={product._id} className="flex flex-col gap-2 py-2 bg-slate-100 p-4 rounded-md" >
                                            <div className="flex items-center justify-between ">
                                                <div className="flex gap-6 items-center" >
                                                    <Image className="w-20 h-20 object-cover rounded-md" src={product.images[0]} alt={product.title} width={400} height={200} />
                                                    <div>
                                                        {product.title}
                                                    </div>
                                                </div>
                                                <div>
                                                    {product.price} تومان
                                                </div>
                                            </div>
                                            <div className="gap-2 flex flex-col" >
						<div>تعداد محصول {product.count}</div>
						<div className="flex gap-4" >
	                                                <DeleteFromCartButton item={product} />
                                                	<ControlCartProductCount item={product} count={product.count} />
						</div>
						<Link href={`/products/${product.category}/${product._id}`} className="text-center cursor-pointer duration-200 hover:bg-blue-600 p-2 px-4 bg-blue-500 text-white rounded-md w-[100%]" >
							جزئیات محصول
						</Link>

                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="pt-6 pb-2" >
                            مجموع : {totalPrice} 
                        </div>
                    </>
                )
            }
		
            </div>
    )
}