import { Order } from "@/models/Order"
import OrderList from "@/ui/components/order-list";
import connectToDatabase from "@/lib/connect-mongo";

export default async function OrderPage(){
        await connectToDatabase();
        console.log(Order == null)
        const orders = await Order.find({}).lean();
        console.log(orders)
        const serializedOrders = orders.map(order => ({
            ...order,
            _id: order._id.toString(),
            createdAt: order.createdAt?.toISOString(),
            updatedAt: order.updatedAt?.toISOString(),
            cart: order.cart.map(item => ({
                ...item,
                _id: item._id?.toString()
            }))
        }));

        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">فهرست سفارشات</h1>
                {
                    orders && orders.length > 0 ? (
                        <OrderList orders={serializedOrders} />
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            هیچ سفارشی وجود ندارد
                        </div>
                    )
                }
            </div>
        )
}