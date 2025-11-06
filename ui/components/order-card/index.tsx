'use client'

import OrderInterface from "@/types/Order-interface"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function OrderCart({ order }: { order: OrderInterface }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
            {/* هدر سفارش */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">سفارش #{order._id?.slice(-6)}</h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.isRecived 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                    }`}>
                        {order.isRecived ? 'تحویل شده' : 'در انتظار تحویل'}
                    </div>
                </div>
            </div>

            {/* اطلاعات مشتری */}
            <div className="p-6 bg-gray-50">
                <h4 className="font-semibold text-gray-700 mb-4">📋 اطلاعات مشتری</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-gray-500">نام کامل</span>
                            <span className="font-semibold text-gray-800">{order.name}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-gray-500">ایمیل</span>
                            <span className="font-semibold text-gray-800 dir-ltr">{order.email}</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-gray-500">آدرس</span>
                            <span className="font-semibold text-gray-800 text-left">{order.address}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-gray-500">کد پستی</span>
                            <span className="font-semibold text-gray-800">{order.postalCode}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* محصولات */}
            <div className="p-6">
                <h4 className="font-semibold text-gray-700 mb-6 text-lg">🛍️ محصولات سفارش ({order.cart?.length || 0})</h4>
                
                {order.cart && order.cart.length > 0 ? (
                    <div className="grid gap-4">
                        {order.cart.map((product, index) => (
                            <ProductItem key={index} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                        <div className="text-gray-400 text-6xl mb-4">🛒</div>
                        <p className="text-gray-500 text-lg">سبد خرید این سفارش خالی است</p>
                    </div>
                )}
            </div>
        </div>
    )
}

// کامپوننت محصول با تمرکز روی نام و قیمت
function ProductItem({ product }: { product: any }) {
    const [imageError, setImageError] = useState(false)
    const hasImage = product.images && product.images[0] && !imageError

    return (
        <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            
            {/* بخش تصویر - اگر عکس داشت نمایش بده */}
            {hasImage ? (
                <div className="flex-shrink-0">
                    <Image 
                        src={product.images[0]} 
                        alt={product.title} 
                        width={100}
                        height={100}
                        className="rounded-xl object-cover w-24 h-24 shadow-md"
                        onError={() => setImageError(true)}
                    />
                </div>
            ) : (
                <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-blue-400 text-3xl">📦</span>
                </div>
            )}
            
            {/* اطلاعات اصلی محصول - نام و قیمت */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex-1">
                        <h5 className="font-bold text-gray-800 text-xl mb-2">
                            {product.title}
                        </h5>
                        
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                                <span className="text-green-700 font-semibold text-lg">
                                    {product.price.toLocaleString()} تومان
                                </span>
                            </div>
                            
                            {product.quantity && (
                                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                                    <span className="text-blue-600">تعداد:</span>
                                    <span className="font-semibold text-blue-700 text-lg">{product.quantity}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* دکمه جزئیات */}
                    {product._id && product.category && (
                        <Link href={`/products/${product.category}/${product._id}`}>
                            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-semibold whitespace-nowrap">
                                مشاهده جزئیات
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}