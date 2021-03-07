const klausur = require('./klausur');

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
            case 'text':
                createText(a.id, a.fragestellung);
                break;
            default: break;
        }
    }
}

function createMultipleChoice(id, fragestellung, antworten) {
    let options = "";
    let i = 0;
    for (const a of antworten) {
        const tempID = `${id}-${i}`;
        options += `<input type="checkbox" id="${tempID}" name="${tempID}" value="${a}"><label for="${tempID}">${fragestellung}</label>`;
        i++;
    }
    const html = `<div id="${id}-div"><p>${fragestellung}</p>${options}</div>`;

    klausur.addKlausurHTML(html);
}

function createSingleChoice(id, fragestellung, antworten) {
    let options = "";
    let i = 0;
    for (const a of antworten) {
        const tempID = `${id}-${i}`;
        options += `<input type="radio" id="${tempID}" name="${id}" value="${a}"><label for="${tempID}">${a}</label>`;
        i++;
    }
    const html = `<div id="${id}-div"><p>${fragestellung}</p>${options}</div>`;

    klausur.addKlausurHTML(html);
}

function createText(id, fragestellung) {
    const html = `<div id="${id}-div"><p>${fragestellung}</p><textarea name="${id}"></textarea></div>`;
    klausur.addKlausurHTML(html);
}

module.exports = {
    aufgabenParse
}
