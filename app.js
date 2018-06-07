const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const app = express();

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

//common middlewares setup
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//routes setup
app.use(express.static("./public"));
const home = require('./routes/home');
const api = require('./routes/api');


app.use('/home', home);
app.use('/api', api);

app.listen(8080);
console.log("8080 port listening...");
