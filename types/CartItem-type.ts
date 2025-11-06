import ProductInterface from "./Product-inteface"

type CartItem = ProductInterface & {count : number}

export default CartItem