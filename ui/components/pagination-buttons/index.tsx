import Link from "next/link";

export default function PaginationButtonsComponent({data : {length,page,productPerPage}} : {data : {productPerPage : number,page : number,length : number}}){
    return (
        <div className="flex gap-4 justify-center items-center pt-10" >
            {
               page < length / productPerPage &&  <Link className="cursor-pointer duration-200 hover:bg-blue-600 p-2 px-4 bg-blue-500 text-white rounded-md" href={`/products?page=${page + 1}`} >next</Link>
            }
            {
                page !== 1 && <Link className="cursor-pointer duration-200 hover:bg-blue-600 p-2 px-4 bg-blue-500 text-white rounded-md" href={`/products?page=${page - 1}`} >previous</Link>
            }
        </div>
    )
}