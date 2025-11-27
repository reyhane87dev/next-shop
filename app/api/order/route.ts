import { Order } from "@/models/Order";
import OrderInterface from "@/types/Order-interface";
import { NextRequest, NextResponse } from "next/server";
import validateBody from "../validate-body";
import connectToDataBase from '@/lib/connect-mongo'
export async function POST(req : NextRequest){
    try{

	await connectToDataBase ();

        const body : OrderInterface = await req.json();
	console.log(body)
        const {name,email,postalCode,address,cart} = body;

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
        console.log(error)
        return new Response(
            JSON.stringify({
                message : "خطای سمت سرور",
                error
            })
        ,{status : 500,headers : {'Content-Type' : "application/json"}});
    }
}