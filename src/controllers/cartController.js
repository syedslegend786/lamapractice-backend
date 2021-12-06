import cartModal from "../models/cartModal.js"
export const cartController = {
    //create and update with same route..
    updateCart: async (req, res) => {
        try {
            const cart = await cartModal.findOneAndUpdate({ userID: req.user.id }, {
                ...req.body
            }, { new: true, upsert: true })
            return res.status(200).json({ cart })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteCart: async (req, res) => {
        try {
            await cartModal.findOneAndDelete({ userdID: req.user.id })
            return res.status(200).json({ msg: "cart deleted successfully!" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getUserCart: async (req, res) => {
        try {
            const cart = await cartModal.findOne({ userID: req.user.id })
            return res.status(200).json({ cart })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getAllCarts: async (req, res) => {
        try {
            const carts = await cartModal.find()
            return res.status(200).json({ carts })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
}