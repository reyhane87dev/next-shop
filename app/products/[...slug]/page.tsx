import { Product } from "@/models/Product";
import ProductInterface from "@/types/Product-interface";
import ProductDetailComponent from "@/ui/components/product-detail/index";
import ProductList from "@/ui/components/product-list";
import connectToDatabase from "@/lib/connect-mongo";

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string[] }> 
}) {
  // Await the params promise
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  await connectToDatabase();

  if (slug.length === 1) {
    const category = slug[0];
    
    // Use lean() and convert to plain objects
    const products = await Product.find({ category }).lean();
    
    // Convert ObjectIds to strings
    const serializedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString(),
      properties: product.properties?.map((prop: any) => ({
        ...prop,
        _id: prop._id?.toString() || prop._id
      }))
    }));

    return (
      <>
        {serializedProducts.length !== 0 ? (
          <>
            <h1 className="text-2xl font-bold mb-6">دسته بندی: {category}</h1>
            <ProductList products={serializedProducts} />
          </>
        ) : (
          <div className="text-center py-8">
            دسته بندی مورد نظر پیدا نشد
          </div>
        )}
      </>
    );
  } 
  else if (slug.length === 2) {
    const _id = slug[1];
    
    // Use lean() and convert to plain object
    const product = await Product.findById(_id).lean();
    
    if (product) {
      // Convert ObjectId to string
      const serializedProduct = {
        ...product,
        _id: product._id.toString(),
        properties: product.properties?.map((prop: any) => ({
          ...prop,
          _id: prop._id?.toString() || prop._id
        }))
      };

      return (
        <>
          <ProductDetailComponent data={serializedProduct} />
        </>
      );
    } else {
      return (
        <div className="text-center py-8">
          محصول مورد نظر پیدا نشد
        </div>
      );
    }
  } 
  else {
    return (
      <div className="text-center py-8">
        صفحه مورد نظر پیدا نشد
      </div>
    );
  }
}