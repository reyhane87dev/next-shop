
import FullCartComponent from "@/ui/components/full-cart";
import type{Metadata} from 'next'

export const metadata : Metadata = {
    title : "سبد خرید",
};

export default function CartPage(){
    return (
        <div>
              <FullCartComponent />
        </div>
    )
}