const express = require('express')
const router = express.Router()
const { signup, login } = require('./controller')
const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        res.json({ "message": "request denied" })
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        next()
    }
    catch (error) {
        res.json({ "message": "token expired" })
    }
}


router.post('/signup', signup)
router.post('/login', login)
module.exports = router