import ProductInterface from "@/types/Product-inteface";
import ProductCard from "../product-card";

export default function ProductList({products} : {products : ProductInterface[]}){
    return (
        <div>
            {
                products.length === 0 ? (
                    <div>
                        <h3>
                            هیچ محصولی یافت نشد
                        </h3>
                    </div>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" >
                        {
                            products.map((product,index)=>{
                                return (
                                    <li key={index} >
                                        <ProductCard data={product} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }
        </div>
    )
}