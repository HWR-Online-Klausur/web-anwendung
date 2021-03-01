const express = require('express');
const app = express();

const { uploadJSON } = require('./jsonRead');

const port = 3000;

app.use(express.static(__dirname + "/static"));


app.get('/', (req, res) => {
    res.send();
})

app.post('/jsonRead',uploadJSON);


app.listen(port, () => {
    console.log(`Der Server wurde gestartet! http://localhost:${port}`);
})
