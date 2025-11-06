import DashboardBar from "@/ui/components/dashboard-bar";
import React from "react";

export default function DasboardLayout({children} : {children : React.ReactNode}){
    return (
        <div className="flex gap-4" >
            <DashboardBar />
            {children}
        </div>
    )
}