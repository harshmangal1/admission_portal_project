const express = require("express");
const app = express();
const port = 3000;
const web = require('./routing/web');
const connectDB = require("./db/connectDB");


// css public link
app.use(express.static('public'))
// html css
app.set('view engine','ejs')


// connectDB
connectDB()


//localhost:3000
app.use('/',web)


//server run
app.listen(port, console.log("server start localhost:3000"));
