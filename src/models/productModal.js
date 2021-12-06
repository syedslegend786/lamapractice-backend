import mongoose from 'mongoose'

const productModal = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    catagories: { type: Array, required: true },
    color: { type: Array },
    price: { type: Number, required: true },
    size: { type: Array },
    img: { type: String, required: true },
    inStock: { type: Boolean, default: true }
}, {
    timestamps: true
})

export default mongoose.model('products', productModal)