import productModal from "../models/productModal.js"
export const productController = {
    createProduct: async (req, res) => {
        try {
            const product = new productModal({
                ...req.body
            })
            await product.save()
            return res.status(200).json({ product })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const product = await productModal.findOneAndUpdate({ _id: req.params.id }, {
                ...req.body
            }, { new: true })
            return res.status(200).json({ product })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await productModal.findOneAndDelete({ _id: req.params.id })
            return res.status(200).json({ msg: "product deleted successfully!" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getSingleProduct: async (req, res) => {
        try {
            const product = await productModal.findOne({ _id: req.params.id })
            return res.status(200).json({ product })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getAllProducts: async (req, res) => {
        const newQuery = req.query.new
        const catagoryQuery = req.query.catagory
        let products = []
        try {
            if (newQuery) {
                products = await productModal.find().sort({ createdAt: -1 }).limit(1)
            } else if (catagoryQuery) {
                products = await productModal.find({ catagories: { $in: [catagoryQuery] } }).sort({ createdAt: -1 })
            } else {
                products = await productModal.find().sort({ createdAt: -1 }).limit(5)
            }
            return res.status(200).json({ legnth: products.length, products })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
}