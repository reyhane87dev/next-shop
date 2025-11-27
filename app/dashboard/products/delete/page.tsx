'use client'

import { useCallback, useRef, useState } from "react";

export default function DeleteProductPage(){
    const [error, setError] = useState("");
    const input = useRef<HTMLInputElement>(null);
    
    const handleOnClick = useCallback(async () => {
        try {
            const productId = input.current?.value.trim();
            
            // اعتبارسنجی بهتر
            if (!productId) {
                setError("لطفا فیلد شناسه محصول را پر کنید");
                return;
            }
            
            setError("");
            
            const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert("محصول با موفقیت حذف شد");
                if (input.current) {
                    input.current.value = ""; // پاک کردن فیلد بعد از حذف موفق
                }
            } else {
                console.error("Error response:", result);
                alert(`محصول حذف نشد: ${result.message || "خطای ناشناخته"}`);
            }
            
        } catch(error) {
            console.error("Delete error:", error);
            alert("خطا هنگام حذف محصول: " + (error instanceof Error ? error.message : "خطای ناشناخته"));
        }
    }, []);

    return (
       <div className="flex justify-center w-[100%]">
         <div className="flex flex-col gap-2 bg-white p-6 rounded-md w-full max-w-md">
            <h2 className="text-center text-xl">حذف محصول</h2>
            <input 
                className="border border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                ref={input} 
                type="text" 
                placeholder="شناسه محصول را وارد کنید" 
            />
            {error && (
                <p className="text-red-500 text-sm text-center">
                    {error}
                </p>
            )}
            <button 
                className="cursor-pointer w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all font-medium" 
                onClick={handleOnClick}
            >
                حذف محصول
            </button>
        </div>
    </div>
    )
}