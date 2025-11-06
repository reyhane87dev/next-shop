import { Product } from "@/models/Product";
import PaginationButtonsComponent from "../pagination-buttons";
import ProductList from "../product-list";
import connectToDatabase from "@/lib/connect-mongo";

export default async function AllProductWithPagination({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1') || 1;
  const productPerPage = 8;
  const skip = (page - 1) * productPerPage;
  
  await connectToDatabase();
  
  // Get products for current page only (better performance)
  const [products, totalCount] = await Promise.all([
    Product.find({})
      .skip(skip)
      .limit(productPerPage)
      .lean(),
    Product.countDocuments()
  ]);

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
    <div>
      <h2 className="text-center pb-5 text-2xl">فهرست همه محصولات</h2>
      <ProductList products={serializedProducts} />
      <PaginationButtonsComponent 
        data={{
          productPerPage, 
          page, 
          length: totalCount // Use total count for pagination
        }} 
      />
    </div>
  );
}