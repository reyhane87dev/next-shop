import AllProductWithPagination from "@/ui/components/all-products-with-pagination";





export default function ProductPage({searchParams} : {searchParams : {page : string}}){
    return (
        <AllProductWithPagination searchParams={searchParams} />
    )
}