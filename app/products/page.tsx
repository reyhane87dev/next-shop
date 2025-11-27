import AllProductWithPagination from "@/ui/components/all-products-with-pagination";


import type {Metadata} from 'next'

export const metadata : Metadata = {
    title : "همه محصولات"
};


export default function ProductPage({searchParams} : {searchParams : {page : string}}){
    return (
        <AllProductWithPagination searchParams={searchParams} />
    )
}