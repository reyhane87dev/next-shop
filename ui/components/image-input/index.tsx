import { useRef, useState } from "react";

export default function ImageInput({
    data: { error, setError, setImages, images }
}: {
    data: {
        error: string,
        setError: (error: string) => void,
        setImages: (images: string[]) => void,
        images: string[]
    }
}) {
    const input = useRef<null | HTMLInputElement>(null);

    function removeImage(parameterIndex: number) {
        const newImageList = images.filter((image, index) => index !== parameterIndex);
        setImages(newImageList);
    }

    function addImage() {
        if (!input.current || input.current.value === '') {
            setError("لینک تصویر را به درستی وارد کنید");
            return;
        }

        const imageUrl = input.current.value;
        
        // اعتبارسنجی ساده URL
        if (!imageUrl.startsWith('http')) {
            setError("لینک تصویر باید با http یا https شروع شود");
            return;
        }

        setImages(prev => [...prev, imageUrl]);
        setError("");
        input.current.value = "";
    }

    return (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">تصاویر محصول</h3>
            
            <div className="flex gap-2 mb-4">
                <input 
                    ref={input} 
                    type="text" 
                    placeholder="لینک تصویر را وارد کنید"   
                    className="border border-gray-300 rounded-lg p-3 flex-1 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                />
                <button 
                    onClick={addImage}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium whitespace-nowrap"
                >
                    افزودن تصویر
                </button>
            </div>
            
            {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            
            {images.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">تصاویر اضافه شده:</h4>
                    <ul className="space-y-2">
                        {images.map((image, index) => (
                            <li key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                        <span className="text-gray-500 text-xs">IMG</span>
                                    </div>
                                    <div className="text-sm text-gray-600 truncate max-w-xs">
                                        {image}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeImage(index)}
                                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                                >
                                    حذف
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}