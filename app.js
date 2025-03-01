const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const web = require("./routing/web");
const connectDB = require("./db/connectDB");

// Middleware for sessions, flash, file upload, and cookies
const session = require("express-session");
const flash = require("connect-flash");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

// Token get
app.use(cookieParser());

// Set up public directory for static files (CSS, JS, images)
app.use(express.static("public"));

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Optional if views folder is at the root

// Enable file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Connect to the database
connectDB();

// Parse incoming request bodies
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

// Flash messages
app.use(flash());

// Routing
app.use("/", web);

// Start the server
app.listen(port, () => console.log("Server started at http://localhost:3000"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

