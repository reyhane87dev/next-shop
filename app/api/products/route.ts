import { Product } from "@/models/Product";
import ProductInterface from "@/types/Product-interface";
import { NextRequest, NextResponse } from "next/server";
import validateBody from "../validate-body";
import connectToDatabase from "@/lib/connect-mongo";


export async function POST(req: NextRequest) {
    try {
	await connectToDatabase();

        const body: ProductInterface = await req.json();
        const { title, images, category, description, price, properties, count } = body;
        
        // validation
        const errors = validateBody({ 
            body, 
            expectedItems: ['title', 'price', 'description', 'category', 'count'] 
        });
        
        if (errors.length > 0) {
            return NextResponse.json(
                {
                    error: errors,
                    message: "اطلاعات محصول معتبر نیست"
                },
                { 
                    status: 400, 
                    headers: { 'Content-Type': 'application/json' } 
                }
            );
        }

        // creating the product
        let newProduct = new Product({ 
            title, 
            images: images || [], 
            category, 
            description, 
            price: Number(price), 
            properties: properties || [],
            count: Number(count) 
        });
        
        newProduct = await newProduct.save();
        console.log(newProduct)
        return NextResponse.json(
            {
                data: newProduct,
                message: "محصول افزوده شد",
            },
            { 
                status: 201, 
                headers: { 'Content-Type': 'application/json' } 
            }
        );
        
    } catch (error) {
        // server error
        console.error("Error creating product:", error);
        
        return NextResponse.json(
            {
                message: "خطای سمت سرور",
                error: process.env.NODE_ENV === 'development' ? error : undefined
            },
            { 
                status: 500, 
                headers: { 'Content-Type': 'application/json' } 
            }
        );
    }
}

// اضافه کردن متد GET برای دریافت محصولات
export async function GET() {
    try {
        const products = await Product.find({});
        return NextResponse.json(
            {
                data: products,
                message: "محصولات دریافت شد",
            },
            { 
                status: 200, 
                headers: { 'Content-Type': 'application/json' } 
            }
        );
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            {
                message: "خطای سمت سرور در دریافت محصولات",
            },
            { 
                status: 500, 
                headers: { 'Content-Type': 'application/json' } 
            }
        );
    }
}