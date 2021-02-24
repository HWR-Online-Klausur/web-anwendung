const klausur = require('./klausur');

/**
 *
 * TEMP INPUTS FOR DEVELOPMENT
 *
 */
const fs = require('fs');
const DEV_INPUT = '';

function dev_read_json() {
    const file = fs.readFileSync('./DEV_TEST.json').toString();
    const jf = JSON.parse(file);
    klausur.setKlausur(jf);
}

dev_read_json()
// console.log(klausur.getAufgaben());

/**
 *
 *  PARSE OPS
 *
 */

function aufgabenParse() {
    for (const a of klausur.getAufgaben()) {
        switch (a.methode) {
            case 'multiple-choice':
                createMultipleChoice(a.id, a.fragestellung, a.antworten);
                break;
            case 'single-choice':
                createSingleChoice(a.id, a.fragestellung, a.antworten);
                break;
            case 'text-kurz':
                createTextKurz(a.id, a.fragestellung);
                break;
            case 'text-lang':
                createTextLang(a.id, a.fragestellung);
                break;
            default: break;
        }
    }
}

// TODO: Create Methoden vollenden

function createMultipleChoice(id, aufgabe, antworten) {
    let options = "";
    for (const a of antworten) {
        options += `<option value="${a}">${a}</option>`;
    }
    const html = `<div id="${id}-div"><p>${aufgabe}</p></div>`;

    klausur.addKlausurHTML(html);
}

function createSingleChoice(id, aufgabe, antworten) {

}

function createTextKurz(id, aufgabe) {

}

function createTextLang(id, aufgabe) {

}

aufgabenParse();
console.log(klausur.getKlausurHTML());
