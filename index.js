const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send(`<html><head><title>HWR Online Klausur</title></head><body><h2>Willkommen zum Online Klausur-System Kick-Off!</h2></body></html>`);
})

app.listen(port, () => {
    console.log('Der Server wurde gestartet!');
})
