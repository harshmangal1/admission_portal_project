const express = require("express");
const app = express();
const port = 3000;
const web = require('./routing/web');
const connectDB = require("./db/connectDB");
//connect flash and sessions
const session = require('express-session');
const flash = require('connect-flash');
const fileUpload= require('express-fileupload')
let cookieParser = require('cookie-parser')

//token get 
app.use(cookieParser())

// css public link
app.use(express.static('public'))
// html css
app.set('view engine','ejs')

app.use(
    fileUpload({
        useTempFiles:true,
    })
)


// connectDB
connectDB()

//parse application 
app.use(express.urlencoded({ extended: false }))


//messages
app.use(session({
    secret: "secret",
    cookie: { maxAge:60000},
    resave: false,
    saveUninitialized: false,
}));
//flash message
app.use(flash());


//routing
//localhost:3000
app.use('/',web)


//server run
app.listen(port, console.log("server start localhost:3000"));

