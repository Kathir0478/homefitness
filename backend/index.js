const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./route')
app.use(express.json())
app.use(cors())
app.use('/api', router)

app.listen(process.env.PORT, () => {
    console.log(`Server started successfully at ${process.env.PORT}`)
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log(`MongoDB connected`)
    }).catch((error) => {
        console.log(error)
    })
})