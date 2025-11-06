import { Product } from "@/models/Product";
import ProductList from "@/ui/components/product-list";
import connectToDatabase from "@/lib/connect-mongo";

export default async function LatestProducts(){
    await connectToDatabase()
    const products = await Product.find({}).limit(8);
    
    // Convert Mongoose documents to plain objects and handle ObjectId
    const serializedProducts = products.map(product => {
        const plainProduct = product.toObject ? product.toObject() : product;
        
        // Convert ObjectId to string
        return {
            ...plainProduct,
            _id: plainProduct._id.toString(),
            // Also convert any nested ObjectIds if they exist
            properties: plainProduct.properties?.map(prop => ({
                ...prop,
                _id: prop._id?.toString() || prop._id
            }))
        };
    });

    
    return (
        <div>
            <h2 className="text-center pb-5 text-2xl">محصولات اخیر</h2>
            <ProductList products={serializedProducts.slice(0,8)} />
        </div>
    )
}