const express = require('express')
const router = express.Router()
const { signup, login, check } = require('./controller')
router.get('/check', check)
router.post('/signup', signup)
router.get('/login', login)
module.exports = router