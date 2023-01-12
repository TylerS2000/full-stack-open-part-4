const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const mongoose = require('mongoose')
const mongoUrl = require('./utils/config')
const { info, error } = require('./utils/logger')

mongoose.connect(mongoUrl)
.then(()=>info('connected to MongoDB'))

.catch((result)=>error("mongo error", result.message))

app.use(cors())
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)


module.exports = app