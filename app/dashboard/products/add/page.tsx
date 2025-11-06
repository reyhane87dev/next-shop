'use client'
import ProductInterface from "@/types/Product-interface"
import Property from "@/types/Property-type"
import ImageInput from "@/ui/components/image-input"
import PropertiesInput from "@/ui/components/properties-input"
import { useFormik } from "formik"
import { useState } from "react"
import * as yup from 'yup'

export default function AddProductPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [imageInputError, setImageInputError] = useState("");
    const [images, setImages] = useState<string[]>([]);

    const validationSchema = yup.object({
        title: yup.string().required("عنوان محصول الزامی است"),
        price: yup.number()
            .min(1, "قیمت باید بیشتر از 0 باشد")
            .required("قیمت الزامی است")
            .typeError("قیمت باید عدد باشد"),
        description: yup.string().required("توضیحات الزامی است"),
        category: yup.string().required("دسته‌بندی الزامی است"),
        count: yup.number()
            .min(0, "تعداد نمی‌تواند منفی باشد")
            .required("تعداد الزامی است")
            .typeError("تعداد باید عدد باشد"),
    })

    async function onSubmit(value: any) {
        try {
            // تبدیل مقادیر به عدد
            const dataToSend = {
                ...value,
                price: Number(value.price),
                count: Number(value.count),
                images,
                properties
            }

            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            })
            
            if (response.ok) {
                alert("محصول اضافه شد");
                formik.resetForm();
                setImages([]);
                setProperties([]);
            } else {
                alert("محصول اضافه نشد")
            }
        } catch (error) {
            alert("خطا در افزودن محصول " + error);
        }
    }

    const formik = useFormik({
        onSubmit,
        initialValues: {
            title: "",
            price: "",
            description: "",
            category: "",
            count: "",
        },
        validationSchema
    })

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">افزودن محصول جدید</h1>
            
            <ImageInput data={{ error: imageInputError, setError: setImageInputError, images, setImages }} />
            
            <div className="mb-4">
                <input
                    className="border border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="عنوان محصول را وارد کنید"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="title"
                    id="title"
                />
                {formik.errors.title && formik.touched.title && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
                )}
            </div>

            <div className="mb-4">
                <input
                    className="border border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="قیمت محصول را وارد کنید"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="price"
                    id="price"
                />
                {formik.errors.price && formik.touched.price && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
                )}
            </div>

            <div className="mb-4">
                <textarea
                    className="border border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="توضیحات محصول را وارد کنید"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="description"
                    id="description"
                    rows={4}
                />
                {formik.errors.description && formik.touched.description && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                )}
            </div>

            <PropertiesInput data={{ properties, setProperties }} />

            <div className="mb-4">
                <input
                    className="border border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="دسته بندی محصول را وارد کنید"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="category"
                    id="category"
                />
                {formik.errors.category && formik.touched.category && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
                )}
            </div>

            <div className="mb-6">
                <input
                    className="border border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="تعداد محصول را وارد کنید"
                    type="number"
                    value={formik.values.count}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="count"
                    id="count"
                />
                {formik.errors.count && formik.touched.count && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.count}</div>
                )}
            </div>

            <button 
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium"
                onClick={() => formik.handleSubmit()}
                type="button"
            >
                افزودن محصول
            </button>
        </div>
    )
}