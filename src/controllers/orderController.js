import orderModal from "../models/orderModal.js"
export const orderController = {
    // create order
    createOrder: async (req, res) => {
        try {
            const _order = new orderModal({
                ...req.body
            })
            await _order.save()
            return res.status(200).json({ _order })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getUserOrders: async (req, res) => {
        try {
            const orders = await orderModal.find({ userID: req.user.id }).sort({ createdAt: -1 })
            return res.status(200).json({ orders })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const orders = await orderModal.find().sort({ createdAt: -1 })
            return res.status(200).json({ orders })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getMonthlyIcomeStatics: async (req, res) => {
        const date = new Date()
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
        try {
            const data = await orderModal.aggregate([
                { $match: { createdAt: { $gte: previousMonth } } },
                {
                    $project: {
                        month: { $month: '$createdAt' },
                        sales: "$ammount"
                    }
                },
                { $group: { _id: '$month', sales: { $sum: "$sales" } } }
            ])
            return res.status(200).json({ data })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
}