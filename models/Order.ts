import mongoose from 'mongoose'
import { productSchema } from './Product'





const orderSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    postalCode : {
        minLength : 10,
        type : String,
        required : true
    },
    isRecived : {
        type : Boolean,
        default : false
    },
    cart : {
        type : [productSchema],
        required : true,
    }
})
export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);