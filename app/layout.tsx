import FooterComponent from '@/ui/components/footer'
import NavigationBarComponent from '@/ui/components/navigation-bar'
import React from 'react'
import '@/ui/styles/index.css'
import CartContextProvider from "@/context/cart-context";
import vazir from '@/ui/vazir'
export default function RootLayout({children} : {children : React.ReactNode }){
    return (
        <html dir={'rtl'} lang="fa" className={vazir.className} >
            <body >
               <CartContextProvider>
                <header>
                    <NavigationBarComponent />

                </header>
                <main className="bg-slate-300 px-4 py-8"  >
                    <div className="container mx-auto" >{children}</div>
                </main>
                <FooterComponent />
 	      </CartContextProvider>
            </body>
              
        </html>
    )
}