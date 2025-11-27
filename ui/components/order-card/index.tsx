// ui/components/order-card.tsx
"use client";

import OrderInterface from "@/types/Order-interface";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductCard from '@/ui/components/product-card'

export default function OrderCard({ data }: { data : string}) {
const order : OrderInterface  = JSON.parse(data)

  const [imageError, setImageError] = useState(false);

  // اگر order نامعتبر است، چیزی نمایش نده
  if (!order) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
        <p className="text-red-500 text-center">
          خطا در بارگذاری اطلاعات سفارش
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
      {/* هدر سفارش */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-semibold whitespace-nowrap">
            محصول تحویل داده شد (به زودی)
          </button>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.isRecived
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {order.isRecived ? "تحویل شده" : "در انتظار تحویل"}
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
              <span className="font-semibold text-gray-800">
                {order.name || "---"}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <span className="text-gray-500">ایمیل</span>
              <span className="font-semibold text-gray-800 dir-ltr">
                {order.email || "---"}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <span className="text-gray-500">آدرس</span>
              <span className="font-semibold text-gray-800 text-left">
                {order.address || "---"}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <span className="text-gray-500">کد پستی</span>
              <span className="font-semibold text-gray-800">
                {order.postalCode || "---"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* محصولات */}
      <div className="p-6">
        <h4 className="font-semibold text-gray-700 mb-6 text-lg">
          🛍️ محصولات سفارش ({order.cart?.length || 0})
        </h4>

        {order.cart && order.cart.length > 0 ? (
          <div className="grid gap-4">
            {order.cart.map((product, index) => (
              <ProductCard key={index} data={product} />
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
  );
}
