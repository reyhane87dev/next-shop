import ProductInterface from "@/types/Product-inteface";
import Image from "next/image";
import AddToCartButton from "../add-to-cart-button";
import Link from "next/link";

export default function ProductCard({data} : {data : ProductInterface}){
    return (
		<div className="p-4 flex flex-col gap-4 bg-white rounded-lg hover:shadow-md duration-200 shadow-slate-500" >
			<div className="bg-white rounded-lg">
				<Image width={800} height={100} alt={data.title} className="rounded-lg" src={data.images[0] || ""} />
			</div>
			<p>
				{data.title}
			</p>
			<div className="text-sm" >
				شناسه محصول : {data._id}
			</div>
			<div> تعداد محصول : {data.count}</div>
			<div className="flex justify-between items-center" >
				<div>
					{data.price}
				</div>
				<AddToCartButton item={JSON.stringify(data)} />
			</div>
			<Link className="pt-2" href={`/products/${data.category}/${data._id}`} >
				<button className="cursor-pointer duration-200 hover:bg-blue-600 p-2 px-4 bg-blue-500 text-white rounded-md w-[100%]" >
					جزئیات محصول
				</button>
			</Link>
		</div>
    )
}