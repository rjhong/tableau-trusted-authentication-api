const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//routes setup
const api = require('./routes/api');

//common middlewares setup
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    req.path.includes("/api") ? next(): res.sendFile(__dirname + "/README.md");
});
app.use('/api', api);


const port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening at port :' + port);
