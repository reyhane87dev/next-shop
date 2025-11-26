import Link from "next/link"
import OrderCard from '@/ui/components/order-card'
import OrderInterface from '@/types/Order-interface'



export default function OrderList({orders} : {orders : OrderInterface[] }) {
	console.log(orders)
    return (
	<>
	   {
		orders.map((order)=>{return <OrderCard order={order} />})
	    }
	</>
    )
}