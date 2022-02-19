const app = require('./app');
const {connectDB} = require('./db');
const port = 3000;


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
