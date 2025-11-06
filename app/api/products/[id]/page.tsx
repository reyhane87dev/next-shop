import { Product } from "@/models/Product";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/connect-mongo";

export async function DELETE({params} : {params : {id : string}}){
    try{
	await connectToDatabase();

        const id = await params.id;
        // check if product exits
        const product = await Product.findById(id);
        if (!product){
            return NextResponse.json(
                JSON.stringify(
                    {
                        message : "محصول مورد نظر وجود ندارد",
                    }
                )
            ,{status : 404,headers : {'Content-Type' : 'application/json'}})
        };
        await Product.deleteOne({_id : id});
        return NextResponse.json(
            JSON.stringify(
                {
                    message : "محصول با موفقیت حذف شد"
                }
            )
        ,{
            status : 200,headers : {'Content-Type' : 'application/json'}
        })
    }catch(error){

        return NextResponse.json(
            JSON.stringify(
                {
                    message : "خطای سمت سرور",
                    error
                }
            )
        ,{
            status : 200,headers : {'Content-Type' : 'application/json'}
        })
    }
}