'use client'

import Image from "next/image";
import { useState } from "react"

export default function  ImageSliderComponent({images,productTitle} : {productTitle : string,images : string[]}){
    const [currentSlide,setCurrentSlide] = useState<number>(0);
    return (
       <div className="bg-white rounded-lg p-4 flex flex-col gap-8" >
            <div className="flex justify-center" ><Image alt={productTitle} className="rounded-lg " src={images[currentSlide]} width={400} height={200} /></div>
            <ul className="flex gap-2" >
                {
                    images.map((image,index)=>{
                        return (
                            <li key={index} >
                                <Image className={index == currentSlide ? "border-2 cursor-pointer rounded-lg border-gray-800 p-1" : "cursor-pointer rounded-lg "} src={image} alt={productTitle} width={100} height={50} onClick={()=>{
                                    setCurrentSlide(index)
                                }} />
                            </li>
                        )
                    })
                }
            </ul>
       </div>
    )
}