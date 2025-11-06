import Link from "next/link"

const items = [
    {
        title : "فهرست محصولات",
        path : "/dashboard/products",
    },
    {
        title : "افرودن محصول",
        path : "/dashboard/products/add",
    },
    {
        title : "حذف محصول",
        path : "/dashboard/products/delete",
    },
    {
        title : "فهرست سفارش ها",
        path : "/dashboard/orders",
    },
]

export default function DashboardBar(){
    
    return (
        <ul className="flex flex-col gap-2" >
            {
                items.map((item,index)=>{
                    return (
                        <li key={index} className={'bg-blue-400 rounded-tl-lg rounded-bl-lg whitespace-nowrap p-3 hover:bg-blue-500 duration-200 text-white'} >
                            <Link href={item.path} >{item.title}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}