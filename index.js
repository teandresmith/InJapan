const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const expHandlebars = require('express-handlebars')
const connectDB = require('./Backend/config/db')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')

// Set up Passport Local
require('./Backend/config/passport')(passport)


// Load Config
dotenv.config({path: './Backend/config/config.env'})

// Connect Database
connectDB()

const app = express()

// Static Folder
app.use(express.static(path.join(__dirname, 'Frontend')))
app.use(methodOverride('_method') )

// Body Parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Setting up Sessions
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        mongooseConnection: mongoose.connection
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
}))


// Set up Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars Helpers
const { } = require('./Backend/helpers/hbs')
const { options } = require('./Backend/routes/InJapan')

// Handlebars
app.engine('.hbs', expHandlebars({helpers: {
},defaultLayout: 'InJapan/home-layout', extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '/Backend/views'))

// Setting up Passport
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', require('./Backend/routes/InJapan'))
app.use('/admin', require('./Backend/routes/admin'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on Port: ${process.env.NODE_ENV} mode on port ${PORT}`))