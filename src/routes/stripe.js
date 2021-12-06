import express from 'express'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET)
const router = express.Router()

router.post("/payment", (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd'
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            return res.status(500).json({ stripeErr })
        } else {
            return res.status(200).json({ stripeRes })
        }
    })
})

export default router;

