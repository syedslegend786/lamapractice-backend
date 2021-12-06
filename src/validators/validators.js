import { check, validationResult } from 'express-validator'
export const signupValidator = [
    check('name')
        .notEmpty()
        .withMessage('name is required'),
    check('lastName')
        .notEmpty()
        .withMessage('fullName is required'),
    check('userName')
        .notEmpty()
        .withMessage('userName is required'),
    check('email')
        .isEmail()
        .withMessage('email is required'),
    check('password')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('minimum 6 digit pasword is required!'),
]
export const singinValidators = [
    check('email')
        .isEmail()
        .withMessage('email is required'),
    check('password')
        .notEmpty()
        .withMessage('password is required!'),
]
//product validators...
export const createProductValidator = [
    check('title')
        .notEmpty()
        .withMessage('product title is required'),
    check('desc')
        .notEmpty()
        .withMessage('description is required'),
    check('catagory')
        .notEmpty()
        .withMessage('catagory is required'),
    check('price')
        .notEmpty()
        .withMessage('price is required'),
    check('img')
        .notEmpty()
        .withMessage('image is required'),
]
//cart validator
export const createCartValidator = [
    check('userID')
        .notEmpty()
        .withMessage('userID is required'),
    check('products')
        .notEmpty()
        .withMessage('products is required'),
]
//order validator
export const createOrderValidator = [
    check('userID')
        .notEmpty()
        .withMessage('userID is required'),
    check('products')
        .notEmpty()
        .withMessage('products is required'),
    check('amount')
        .notEmpty()
        .withMessage('amount is required'),
    check('address')
        .notEmpty()
        .withMessage('address is required'),
]
export const validateResult = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    next()
}