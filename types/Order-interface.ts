import CartItem from "./CartItem-type"

interface OrderInterface {
    name : string
    email : string
    address : string
    postalCode : string,
    cart : CartItem[]
}

export default OrderInterface