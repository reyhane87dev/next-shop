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
    {
        title : "ویرایش محصولات (به زودی)",
        path : "#",
    },
]

export default function DashboardBar(){
    
    return (
        <div className="bg-gradient-to-b from-blue-600 to-indigo-700 rounded-2xl p-4 shadow-2xl min-w-64">
            {/* هدر */}
            <div className="mb-6 px-2">
                <h2 className="text-white text-xl font-bold text-center">پنل مدیریت</h2>
                <div className="w-16 h-1 bg-white/30 rounded-full mx-auto mt-2"></div>
            </div>
            
            {/* منوی آیتم‌ها */}
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index}>
                        <Link 
                            href={item.path}
                            className="block w-full text-right p-3 rounded-xl transition-all duration-300 bg-white/10 text-white/90 hover:bg-white/20 hover:shadow-md border border-white/10 hover:border-white/20 font-medium hover:font-semibold"
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* فوتر */}
            <div className="mt-6 pt-4 border-t border-white/20">
                <div className="text-white/60 text-sm text-center">
                    پنل مدیریت فروشگاه
                </div>
            </div>
        </div>
    )
}