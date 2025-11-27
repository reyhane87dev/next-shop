import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/connect-mongo";
import mongoose from "mongoose";

export async function DELETE(
    request: NextRequest, 
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();

        const id = params.id;
        
        // اعتبارسنجی شناسه
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "شناسه محصول معتبر نیست" },
                { status: 400 }
            );
        }

        console.log("Deleting product with ID:", id);
        
        // بررسی وجود محصول قبل از حذف
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return NextResponse.json(
                { message: "محصول یافت نشد" },
                { status: 404 }
            );
        }

        // حذف محصول
        await Product.findByIdAndDelete(id);
        
        return NextResponse.json(
            { 
                message: "محصول با موفقیت حذف شد",
                deletedProduct: {
                    id: existingProduct._id,
                    name: existingProduct.name
                }
            },
            { status: 200 }
        );
        
    } catch(error) {
        console.error("Server delete error:", error);
        return NextResponse.json(
            { 
                message: "خطای سمت سرور",
                error: process.env.NODE_ENV === 'development' ? error : undefined
            },
            { status: 500 }
        );
    }
}