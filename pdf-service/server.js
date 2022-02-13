const express = require('express');
const app = express();
const fs = require('fs')
const path = require('path')
const templateFile = require('template-file')
const latex = require('node-latex')
const KlausurData = require('./db/models/klausurData.model')
const Klausur = require('./db/models/klausur.model')
const {connectDB} = require("./db");

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.disable('x-powered-by');

// CORS Header
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token'
    );

    next();
});

app.get('/get/:id', async (req, res) => {
    if (fs.existsSync(path.join(`pdf/${req.params.id}.pdf`))) {
        res.sendFile(__dirname + `/pdf/${req.params.id}.pdf`)
    } else {
        const t = String(fs.readFileSync(path.resolve('template/pdf.template')))
        let template = t.replaceAll('{', '#(#')
            .replaceAll('}', '#)#')
            .replaceAll('[[', '{{')
            .replaceAll(']]', '}}')

        await KlausurData.findOne({
            _id: req.params.id
        }).then(async k => {

            const kID = await Klausur.findOne({
                _id: k.klausurID
            }).then(kl => kl)
            const aufgaben = []
            let i = 1
            for (const a of k.aufgaben) {
                aufgaben.push({
                    'index': i,
                    'fragestellung': a.fragestellung,
                    'antworten': a.antworten
                })
                i++
            }

            const r = templateFile.render(template, {
                'name': k.name,
                'matrnr': k.matrikelnummer,
                'titel': kID.titel,
                'modul': kID.modul,
                'dozent': kID.dozent,
                'abgabe': k.zeitpunkt,
                'aufgaben': aufgaben
            })
                .replaceAll('#(#', '{')
                .replaceAll('#)#', '}')

            const out = fs.createWriteStream(path.join(`pdf/${req.params.id}.pdf`))

            latex(r).pipe(out)
                .on('finish', () => {
                    res.setHeader('Content-Type', 'application/pdf')
                    res.sendFile(__dirname + `/pdf/${req.params.id}.pdf`)
                })
        })
            .catch((e) => {
                console.log(e)
                res.sendStatus(404)
            })
    }
})

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
