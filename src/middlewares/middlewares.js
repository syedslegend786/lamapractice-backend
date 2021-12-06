import jwt from 'jsonwebtoken'
import userModal from '../models/userModal.js'
export const requireSignIn = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return res.status(400).json({ msg: 'jwt required' })
    jwt.verify(token, process.env.JWT_SECRETS, (error, user) => {
        if (error) return res.status(500).json({ msg: 'access denied!' })
        if (user) {
            req.user = user
            next()
        }
    })
}
export const adminMiddleware = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(400).json({ msg: "not authorized!" })
    }
    next()
}
export const userMiddleware = (req, res, next) => {
    if (req.user.isAdmin) {
        return res.status(400).json({ msg: "not authorized!" })
    }
    next()
}