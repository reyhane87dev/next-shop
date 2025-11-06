import Property from "@/types/Property-type";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from 'yup';

export default function PropertiesInput({ data: { setProperties, properties } }: {
    data: {
        setProperties: (properties: Property[]) => void,
        properties: Property[]
    }
}) {
    const nameInput = useRef<null | HTMLInputElement>(null);
    const valueInput = useRef<null | HTMLInputElement>(null);

    function removeProperty(parameterIndex: number) {
        const newPropertyList = properties.filter((property, index) => index !== parameterIndex);
        setProperties(newPropertyList);
    }

    function onSubmit(value: Property) {
        setProperties(prev => [...prev, value]);
        formik.resetForm();
        if (nameInput.current) nameInput.current.focus();
    }

    const validationSchema = yup.object({
        name: yup.string().required("نام ویژگی الزامی است"),
        value: yup.string().required("مقدار ویژگی الزامی است"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            value: ""
        },
        validationSchema,
        onSubmit
    });

    return (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">ویژگی‌های محصول</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <input
                        ref={nameInput}
                        type="text"
                        placeholder="نام ویژگی را وارد کنید"
                        name="name"
                        className="border border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        id="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                    )}
                </div>
                
                <div>
                    <input
                        className="border border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        ref={valueInput}
                        type="text"
                        placeholder="مقدار ویژگی را وارد کنید"
                        name="value"
                        id="value"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.value}
                    />
                    {formik.errors.value && formik.touched.value && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.value}</div>
                    )}
                </div>
            </div>

            <button 
                onClick={() => formik.handleSubmit()}
                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium"
                type="button"
            >
                افزودن ویژگی
            </button>

            {properties.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">ویژگی‌های اضافه شده:</h4>
                    <ul className="space-y-2">
                        {properties.map((property, index) => (
                            <li key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                                <div className="text-gray-800">
                                    <span className="font-medium">{property.name}</span>: {property.value}
                                </div>
                                <button 
                                    onClick={() => removeProperty(index)}
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