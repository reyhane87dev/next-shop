import DashboardBar from "@/ui/components/dashboard-bar";
import React from "react";
import type {Metadata} from 'next'

export const metadata : Metadata = {
    title : "داشبورد",
}

export default function DasboardLayout({children} : {children : React.ReactNode}){
    return (
        <div className="flex flex-col md:flex-row gap-4" >
            <DashboardBar />
            {children}
        </div>
    )
}