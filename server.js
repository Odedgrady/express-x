// server.js
// load the things we need
const path = require("path");
var express = require('express');
var app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

require("./api/routes/index.js")(app);
require("./api/routes/login.js")(app);
require("./api/routes/kontakt.js")(app);

require("./api/config/sql")


app.listen(3001);
console.log('3001 is the magic port');