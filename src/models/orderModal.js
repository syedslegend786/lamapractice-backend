import mongoose from 'mongoose'

const ordertModal = new mongoose.Schema({
    userID: { type: mongoose.Types.ObjectId, ref: "users" },
    products: [
        {
            productID: { type: mongoose.Types.ObjectId, ref: "products" },
            qty: { type: Number, default: 1 },
        }
    ],
    ammount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ["pending", "packing", "dilivered"] },
}, {
    timestamps: true
})

export default mongoose.model('orders', ordertModal)