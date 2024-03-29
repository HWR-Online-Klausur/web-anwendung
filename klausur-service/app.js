const express = require('express');
const app = express();

const session = require('express-session')
const MongoStore = require('connect-mongo')

const router = require('./routes');
const errorHandler = require('./middleware/errorHandlingMiddleware');

const userController = require('./controllers/userController');

//region Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const store = MongoStore.create({
    mongoUrl: process.env.DB_URI,
    collectionName: 'sessions'
})

const sess = session({
    name: 'onlineklausur.sid',
    secret: process.env.SESSION_SECRET,
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
app.get('/klausur.html',userController.CheckKlausurID, express.static(__dirname + "/static"));
app.get('/dashboardKlausur.html',userController.CheckDozentID, express.static(__dirname + "/static"));
app.get('/dashboard.html',userController.CheckDozentID, express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/static"));
app.use('/api', router);
//endregion Middleware


//Error handler. Should always be last middleware!
app.use(errorHandler);

module.exports = app;
