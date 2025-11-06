// models/Product.ts
import mongoose from 'mongoose'

export const productSchema = new mongoose.Schema({
    images: [String],
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,  // ✅ اصلاح شد: String به Number
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    properties: {
        type: [{name: String, value: String}],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true
})

export const Product = mongoose.models.products || mongoose.model('products', productSchema)