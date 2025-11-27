'use client'
import { CartContext } from '@/context/cart-context';
import OrderInterface from '@/types/Order-interface';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as yup from 'yup'

async function postOrder(value : OrderInterface,clearCart : ()=>void){

    try{
    const response = await fetch("http://localhost:3000/api/order",{
        body : JSON.stringify(value),
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        }
    });
	console.log(response);
    if (response.ok){
        clearCart()
        alert("سفارش ثبت گردید");
    }
    else {
        alert("خطا در هنگام ثبت سفارس")
    }
    }catch(error){
        alert("مشکلی پیش امده است" + " " + error)
    }
}

export default function ShopingCartForm(){
    const {cart,clearCart} = useContext(CartContext);

    const validationSchema = yup.object({
        name : yup.string().required("نام ضروری است"),
        email : yup.string().email("ایمیل معتبر نیست").required("ایمیل ضروری است"),
        address : yup.string().required("ادرس ضروری است"),
        postalCode : yup.string().required("کدپستی ضروری است"),
    });

    const formik = useFormik({
        initialValues : {
            name : '',
            email : '',
            address :  '',
            postalCode :''
        },
        validationSchema,
        onSubmit(value) {postOrder({...value,cart},clearCart)}
    });

    return (
        <div className="bg-white p-4 rounded-lg" >
            <h2 className="text-2xl pb-5" >
                اطلاعات شما
            </h2>
            <div className="flex flex-col gap-4" >
                {/* name input */}
                <div >
                    <input 
                        placeholder={"نام را وارد کنید"}
                        className="border-1 rounded-md p-2 border-gray-700  w-[100%]"
                        type={'text'} 
                        id={'name'}
                        name={'name'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values['name']}
                    />
                    <div className="text-red-500 text-sm" >
                        {formik.errors.name}
                    </div>
                </div>
                {/* name input */}
                {/* email input */}
                <div >
                    <input 
                        placeholder={"ایمیل را وارد کنید"}
                        className="border-1 rounded-md p-2 border-gray-700  w-[100%]"
                        type={'text'} 
                        id={'email'}
                        name={'email'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values['email']}
                    />
                    <div className="text-red-500 text-sm" >
                        {formik.errors.email}
                    </div>
                </div>
                {/* email input */}
                {/* address input */}
                <div >
                    <input 
                        placeholder={"ادرس را وارد کنید"}
                        className="border-1 rounded-md p-2 border-gray-700  w-[100%]"
                        type={'text'} 
                        id={'address'}
                        name={'address'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values['address']}
                    />
                    <div className="text-red-500 text-sm" >
                        {formik.errors.address}
                    </div>
                </div>
                {/* address input */}
                {/* postalCode input */}
                <div >
                    <input 
                        placeholder={"کدپستی را وارد کنید"}
                        className="border-1 rounded-md p-2 border-gray-700  w-[100%]"
                        type={'text'} 
                        id={'postalCode'}
                        name={'postalCode'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values['postalCode']}
                    />
                    <div className="text-red-500 text-sm" >
                        {formik.errors.postalCode}
                    </div>
                </div>
                {/* postalCode input */}
		<button onClick={formik.submitForm} className="p-2 bg-black text-white rounded-md cursor-pointer hover:bg-gray-900 duration-200">ثبت سفارش</button>
            </div>
        </div>
    )
}