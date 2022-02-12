const express = require('express');
const app = express();

const session = require('express-session')
const MongoStore = require('connect-mongo')

const router = require('./routes');
const errorHandler = require('./middleware/errorHandlingMiddleware');

//region Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const store = MongoStore.create({
    mongoUrl: process.env.DB_URI,
    collectionName: 'sessions'
})

const sess = session({
    name: 'onlineklausur.sid',
    secret: 'safesecret',
    saveUninitialized: false,
    resave: true,
    store: store,
    cookie: {
        httpOnly: true,
        maxAge: 999999999999,
        sameSite: 'lax',
        secure: false
    }
})

app.use(sess)

app.use(express.static(__dirname + "/static"));
app.use('/api', router);
//endregion Middleware


//Error handler. Should always be last middleware!
app.use(errorHandler);

module.exports = app;
