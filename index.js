const express = require('express');
const app = express();

const { uploadJSON } = require('./jsonRead');

const port = 3000;

app.use(express.static(__dirname + "/static"));
app.use(express.json());


app.get('/', (req, res) => {
    res.send();
})

app.post('/api/jsonRead',uploadJSON);

let klausurStatus = false;

app.get('/api/klausurStatus', (req,res)=>{
    res.send(klausurStatus);
})

app.post('/api/klausurStarten', (req, res)=>{
        console.log(req.body);
})


app.listen(port, () => {
    console.log(`Der Server wurde gestartet! http://localhost:${port}`);
})
