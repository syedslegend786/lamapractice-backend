import userModal from './../models/userModal.js'
import CryptoJS from 'crypto-js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()
const generateTocken = (data) => {
    const toReturn = jwt.sign(data, process.env.JWT_SECRETS, { expiresIn: '1d' })
    return toReturn;
}
const createRefreshToken = (data) => {
    return jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: '1d' })
}
export const userController = {
    signup: async (req, res) => {
        try {
            const {
                name,
                lastName,
                userName,
                email,
                password
            } = req.body
            if (!name || !lastName || !userName || !email || !password) {

            }
            const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET).toString();
            const newUser = new userModal({
                name,
                lastName,
                userName,
                email,
                password: encryptedPassword
            })
            const accessToken = generateTocken({ id: newUser._id, isAdmin: newUser.isAdmin })
            const refreshToken = createRefreshToken({ id: newUser._id, isAdmin: newUser.isAdmin })
            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/api/refreshToken',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
            })
            await newUser.save()
            res.json({
                newUser,
                accessToken,
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    signin: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await userModal.findOne({ email: email })
            if (!user) {
                return res.status(400).json({ msg: 'wrong credentials!' })
            }
            //decrypt password!!!
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET);
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
            if (originalPassword !== password) {
                return res.status(400).json({ msg: 'incorrect password!' })
            }
            //jwt
            const accessToken = generateTocken({ id: user._id, isAdmin: user.isAdmin })
            const refreshToken = createRefreshToken({ id: user._id, isAdmin: user.isAdmin })
            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/api/refreshToken',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
            })
            const { password: _password, ...other } = user._doc
            res.status(200).json({
                accessToken,
                user: other,
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    refreshToken: async (req, res) => {
        try {
            const ref_token = req.cookies.refreshtoken
            if (!ref_token) {
                return res.status(400).json({ msg: 'please login!' })
            }
            jwt.verify(ref_token, process.env.REFRESH_SECRET, async (err, result) => {
                if (err) return res.status(400).json({ msg: 'please login!' })
                if (result) {
                    console.log('restul==>', result)
                    const _user = await userModal.findById(result.id).select('-password')
                    if (!_user) return res.status(400).json({ msg: 'user does not exist!' })
                    if (_user) {
                        const accessToken = generateTocken({ id: _user._id, isAdmin: _user.isAdmin })
                        return res.status(200).json({
                            accessToken,
                            user: _user,
                        })
                    }
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            console.log("updated user", req.user)
            if (req.body.password) {
                req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString();
            }
            const updatedUser = await userModal.findOneAndUpdate({ _id: req.user.data.id }, {
                ...req.body
            }, { new: true })
            return res.status(200).json({ updatedUser })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const query = req.query.new
            const users = query
                ?
                await userModal.find().sort({ _id: -1 }).limit(5)
                :
                await userModal.find()
            return res.status(200).json({ users })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getUserStats: async (req, res) => {
        try {
            //date of last year from now...
            const date = new Date()
            const lastyear = new Date(date.setFullYear(date.getFullYear() - 1))

            const data = await userModal.aggregate([
                { $match: { createdAt: { $gte: lastyear } } },
                {
                    $project: {
                        month: { $month: "$createdAt" }
                    }
                },
                { $group: { _id: '$month', total: { $sum: 1 } } }
            ])
            return res.status(200).json({ data })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    logOut: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/api/refreshToken' })
            return res.status(200).json({ msg: "Logged out!" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
}