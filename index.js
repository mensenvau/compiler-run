const express  = require("express")
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require('express-session')
const cookieParser = require("cookie-parser");
const FileStore = require("session-file-store")(session)
const PORT  = process.env.PORT || 8080;
require("dotenv").config()

require("./app/socket")(io)

// session
app.use(cookieParser(process.env.scr));
app.use(session({
    secret: process.env.scr,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({ path: '/session-store' }),
    cookie: { maxAge: 3600000, secure: false, httpOnly: false }
}))


// public public folder
app.use(express.static('public'));

// ejs render
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

// app yuborish
app.use("/", require("./app/app"))


http.listen(PORT,"192.168.10.75",()=>
{
    console.log(`Create server : ${PORT}`) ;
})

module.exports  = app