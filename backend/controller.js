const User = require('./model')
const bcrypt = require('bcrypt')

async function signup(req, res) {
    try {
        const data = req.body;
        const isNamePresent = await User.findOne({ name: data.name })
        if (isNamePresent) {
            return res.status(400).json({ "message": "Username already exist, try different name" })
        }
        const isMailPresent = await User.findOne({ email: data.email })
        if (isMailPresent) {
            return res.status(400).json({ "message": "Theis mail id is used already" })
        }
        else {
            data.password = await bcrypt.hash(data.password, 10)
            await User.create(data)
            return res.status(200).json({ "message": "Successfully SignedUp" })
        }
    } catch (error) {
        return res.status(404).json({ "message": error })
    }
}

async function login(req, res) {
    try {
        const data = req.body;
        const existingUser = await User.findOne({ email: data.email })
        if (existingUser) {
            const isPasswordMatch = await bcrypt.compare(data.password, existingUser.password)
            if (!isPasswordMatch) {
                return res.status(404).json({ "message": "Password doesn't match" })
            }
            else {
                return res.status(200).json({ "message": "Successfully logged in" })
            }
        }
        else {
            return res.status(400).json({ "message": "No user found with this email" })
        }
    } catch (error) {
        return res.status(404).json({ "message": error })
    }

}
module.exports = { signup, login }