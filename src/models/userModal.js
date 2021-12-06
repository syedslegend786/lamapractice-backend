import mongoose from 'mongoose'

const userModal = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
}, {
    timestamps: true
})

export default mongoose.model('users', userModal)