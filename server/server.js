const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const passport = require("passport");
const cookieParser = require('cookie-parser')
require('dotenv').config()


// connect DB
const connectDB = require('./config/db')
connectDB();

app.use(cookieParser());

// init middleware
app.use(express.json({ extended: true }))
app.use(cors())
app.use(morgan('dev'))


app.use(passport.initialize());
app.use(passport.session())
require('./services/googleStrategy')
require('./services/facebookStrategy')


// routes for oAuth
require('./routes/googleAuth')(app)
require('./routes/facebookAuth')(app)

// general route 
app.use('/', require('./routes/advertise'))
app.use('/', require('./routes/localAuth'))
app.use('/', require('./routes/postAd'))


// Start the Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})