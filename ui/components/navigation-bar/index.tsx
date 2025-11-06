'use client'
import Link from "next/link";
import { useState } from "react";
import { FaBars } from 'react-icons/fa';

export default function NavigationBarComponent(){
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    return (
        <nav className="bg-blue-500 text-white p-4" >
            <div className={!isMenuOpen ? "container mx-auto flex justify-between items-center" : "container mx-auto flex flex-col md:flex-row md:justify-between md:items-center"}>
                <div className="block md:hidden" >
                    <div onClick={()=>setIsMenuOpen(prev=>!prev)} >    
			<FaBars size={24} />
		    </div>
               	</div>
                <div className="hidden md:block" >
                    <h3 className="text-2xl" >فروشگاه من</h3>
                </div>                
		<div className={isMenuOpen ? "flex gap-4 item-center md:flex-row flex-col pt-4 " : "gap-2 item-center md:flex-row flex-col hidden md:flex"} >
                    <Link href={'/'} >صفحه اصلی</Link>
                    <Link href={'/products'} >محصولات</Link>
                    <Link href={'/cart'} >سبد خرید</Link>
                </div>
            </div>
        </nav>
    )
}