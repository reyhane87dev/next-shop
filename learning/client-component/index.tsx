import { Suspense } from "react";
import UserCart from "./user";
import FallBack from "./fall-back";

export default function Page(){
    
    return (
        <div>
            <Suspense fallback={<FallBack />} >
                <UserCart />
            </Suspense>
        </div>
    )
}