const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000


const flash = require('express-flash')
require('dotenv').config()

const mongoose = require('mongoose')
const session = require('express-session')
const MongoDbStore = require('connect-mongo')
const passport = require('passport')

//DB
const url = 'mongodb://localhost/PizzeriaOrder';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});
const connection=mongoose.connection;
connection.once('open', ()=>{
    console.log('Database Connected...');
});



//Session config

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({mongoUrl: 'mongodb://localhost/PizzeriaOrder'}),
    cookie: { maxAge: 1000 * 60 * 60 * 24}// 24 ore
}))

app.use(flash())

//Configurazione passport
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

//Assets
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Global midleware
app. use((req,res,next)=>{
    res.locals.session=req.session
    res.locals.user = req.user
    next()
})

app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs')

require('./routers/web')(app)

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})