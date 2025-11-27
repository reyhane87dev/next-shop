import Link from "next/link"
import OrderCard from '@/ui/components/order-card'
import OrderInterface from '@/types/Order-interface'



export default function OrderList({orders} : {orders : OrderInterface[] }) {

    return (
	<>
	   {
		orders.map((order,index)=>{return <OrderCard key={index} data={JSON.stringify(order)} />})
	    }
	</>
    )
}