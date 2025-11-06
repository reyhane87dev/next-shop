import ImageSliderComponent from "../image-slider";
import AddToCartButton from "../add-to-cart-button";
import { ProductInterface } from "@/types/Product-interface";

export default function ProductDetailComponent({ data }: { data: ProductInterface }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
           <ImageSliderComponent images={data.images} productTitle={data.title} />
           
            <div className="flex flex-col gap-6">
                {/* Product Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {data.title}
                    </h1>
                    <span className="text-sm text-gray-500">
                        دسته بندی: {data.category}
                    </span>
                    <div className="text-xs text-gray-400 mt-1">
                        شناسه محصول: {data._id}
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed">
                    {data.description}
                </p>

                {/* Stock Info */}
                <div className={`text-sm ${data.count > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.count > 0 ? `موجود در انبار (${data.count} عدد)` : 'ناموجود'}
                </div>

                {/* Properties Table */}
                {data.properties && data.properties.length > 0 && (
                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                            <tbody>
                                {data.properties.map((property, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="p-3 font-medium text-gray-700 border-b">{property.key}</td>
                                        <td className="p-3 text-gray-600 border-b">{property.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Price and Add to Cart */}
                <div className="flex gap-6 items-center pt-4 border-t">
                    <span className="text-2xl font-bold text-green-600">
                        {data.price} تومان
                    </span>
                    <AddToCartButton item={data} />
                </div>
            </div>
        </div>
    );
}