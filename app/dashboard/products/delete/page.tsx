'use client'

import { useCallback, useRef, useState } from "react";

export default function DeleteProductPage(){
    const [error,setError] = useState("");
    const input = useRef<null | HTMLInputElement>(null);
    
    const handleOnClick = useCallback(async function (){
        try{
            if (input.current!.value === '') setError("لطفا فیلد شناسه محصول را پر کنید")
            if (error) return;
            setError("")
            const response = await fetch(`http://localhost:3000/api/products/${input.current!.value}`,{
                method : "DELETE",
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if (response.ok){
                alert("محصول با موفقیت حذف شد")
            }else{
                alert("محصول حذف نشد")
            }
            
        }catch(error){
            alert("خطا هنگام حذف محصول " + error)
        }
    },[])

    return (
       <div className="flex justify-center w-[100%]" >
	 <div className="flex flex-col gap-2 bg-white p-6 rounded-md" >
	    <h2 className="text-center text-xl" >حذف محصول</h2>
            <input className="border border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" ref={input} type="text" placeholder="شناسه محصول را وارد کنید" />
            <p>
                {error}
            </p>
            <button className="cursor-pointer w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium" onClick={handleOnClick} >حذف محصول</button>
        </div>
	</div>
    )
}