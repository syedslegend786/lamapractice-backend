
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
//routes...
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'
import stripe from './routes/stripe.js'
//coonnect to mongodb

mongoose.connect(process.env.MONGOOSE_URL, {

}
)
mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) console.log(err.message);
    else
        console.log('Connected to mongodb')
})
const corsConfig = {
    credentials: true,
    origin: true,
};
const app = express()
app.use(express.json())
app.use(cors(corsConfig))
app.use(cookieParser())
app.get("/", (req, res) => {
    res.send("hello world")
})
//middleware...
app.use("/api", userRoute)
app.use("/api", productRoute)
app.use("/api", cartRoute)
app.use("/api", orderRoute)
app.use("/api", stripe)
const PORT = 5000
app.listen(PORT, () => { console.log(`server is running at ${PORT}`) })