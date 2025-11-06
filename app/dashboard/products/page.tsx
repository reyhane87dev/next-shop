import { Product } from "@/models/Product";
import ProductList from "@/ui/components/product-list";
import connectToDatabase from "@/lib/connect-mongo";

export default async function DashboardProductsPage() {
    await connectToDatabase();
    
    const products = await Product.find({}).lean();
    const serializedProducts = products.map(product => ({
        ...product,
        _id: product._id.toString(),
        createdAt: product.createdAt?.toISOString(),
        updatedAt: product.updatedAt?.toISOString()
    }));

    return <ProductList products={serializedProducts} />;
}