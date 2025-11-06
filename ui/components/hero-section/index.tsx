import Image from "next/image";
import Link from "next/link";

export default function HeroSectionComponent(){
    return (
        <div className="mb-8 bg-white p-10 rounded-lg grid grid-cols-1 md:grid-cols-2" >
            <div className="flex justify-center flex-col gap-6" >
                <h2 className="text-4xl" >فروشگاه</h2>
                <p>
                    بهترین محصولات را با قیمت باورنکردنی خریداری کنید همین حالا مجموعه ای از کالا های متنوع را بررسی کرده و تجربه خریدی متفاوت را احساس کنید
                </p>
                <Link href={'/products'} >
                    <button className="cursor-pointer duration-200 hover:bg-blue-600 p-2 px-4 bg-blue-500 text-white rounded-md" >نمایش محصولات</button>
                </Link>
            </div>
            <div className="hidden md:flex justify-end items-center " >
                <Image src={'/1.jpg'} alt="anime character" width={500} height={200} className="rounded-lg"  />
            </div>
        </div>
    )
}