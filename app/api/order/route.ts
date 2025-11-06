import { Order } from "@/models/Order";
import OrderInterface from "@/types/Order-interface";
import { NextRequest, NextResponse } from "next/server";
import validateBody from "../validate-body";
export async function POST(req : NextRequest){
    try{


        const body : OrderInterface = await req.json();
        const {name,email,postalCode,address,cart} = body;
        // ---- validation ----
        const errors = validateBody({expectedItems : ['name','email','address','postalCode'],body});
        if (body.postalCode.length < 10){
            errors.push("کد پستی نامعتبر است")
        }
        if (errors.length){
            return NextResponse.json(
                JSON.stringify({
                    error : errors,
                    message : "اطلاعات ارسال شده نامعتبر میباشد"
                })
            ,{status : 400,headers : {'Content-Type' : "application/json"}})
        }
        // ---- creating new order ---
        const newOrder = await new Order({
            name,email,postalCode ,address,cart
        });
        await newOrder.save();
        return new Response(
            JSON.stringify({
                message : "سفارش ثبت گردید"
            })
        ,{status : 201,headers : {'Content-Type' : "application/json"}});
        
    }catch(error){
        // ---- server error ---
        return new Response(
            JSON.stringify({
                message : "خطای سمت سرور",
                error
            })
        ,{status : 500,headers : {'Content-Type' : "application/json"}});
    }
}