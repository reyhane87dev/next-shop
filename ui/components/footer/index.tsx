export default function FooterComponent(){
    return (
        <footer className="p-4 py-10 bg-blue-500 text-white" >
            <div className="container mx-auto" >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4" >
                   <div>
                        <h4 className="text-xl" >
                            راه های ارتباطی
                        </h4>
                        <ul className="gap-1 flex flex-col mt-2" >
                            <li>
                                اینستاگرام
                            </li>
                            <li>
                                تلگرام
                            </li>
                            <li>
                                اپارات
                            </li>
                            <li>
                                شماره تماس
                            </li>
                        </ul>
                   </div>
                   <div>
                        <h4 className="text-xl">
                            دسته بندی محصولات
                        </h4>
                        <ul className="gap-1 flex flex-col mt-2">
                            <li>
                                شال و روسری
                            </li>
                            <li>
                                شوار
                            </li>
                            <li>
                                مانتو
                            </li>
                        </ul>
                   </div>
                   <div>
                        <h4 className="text-xl">
                            سایر وبسایت ها
                        </h4>
                        <ul className="gap-1 flex flex-col mt-2">
                            <li>
                                وبسایت فروش مواد غذایی
                            </li>
                            <li>
                                وبسایت فروش لوازم دیجیتال
                            </li>
                        </ul>
                   </div>
                </div>
                <div className="border-t-2 py-2 mt-10 text-center" >
                    فروشگاه من - 2025
                </div>
            </div>
        </footer>
    )
}