const express = require('express');
const app = express();

const port = 3000;

const {connectDB} = require('./db');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandlingMiddleware');

const session = require('express-session')
const MongoStore = require('connect-mongo')

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
    saveUninitialized: true,
    resave: true, // TODO: SET TO FALSE AFTER KLAUSUR SELECTION IS IMPLEMENTED
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

const start = async () => {
    await connectDB().then(async () => {
        await app.listen(port);
    });
}

start().then(() => {
    console.log(`Der Server wurde gestartet! http://localhost:${port}`);
}).catch(e => {
    console.error(e)
});
