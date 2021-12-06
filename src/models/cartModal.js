import mongoose from 'mongoose'

const cartModal = new mongoose.Schema({
    userID: { type: mongoose.Types.ObjectId, ref: "users" },
    products: [
        {
            productID: { type: mongoose.Types.ObjectId, ref: "products" },
            qty: { type: Number, default: 1 },
        }
    ]
}, {
    timestamps: true
})

export default mongoose.model('carts', cartModal)