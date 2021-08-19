const klausur = require('./klausur');

/**
 *
 *  PARSE OPS
 *
 */

function aufgabenParse() {
    klausur.clearKlausurHTML();
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
        options += `<input class="form-check-input" type="checkbox" id="${tempID}" name="${tempID}" value="${a}"><label class="form-check-label" for="${tempID}">${a}</label> <br>`;
        i++;
    }
    const html = `<div id="${id}-div"><p>${fragestellung}</p>${options}</div><hr>`;

    klausur.addKlausurHTML(html);
}

function createSingleChoice(id, fragestellung, antworten) {
    let options = "";
    let i = 0;
    for (const a of antworten) {
        const tempID = `${id}-${i}`;
        options += `<input class="form-check-input" type="radio" id="${tempID}" name="${id}" value="${a}"><label class="form-check-label" for="${tempID}">${a}</label> <br>`;
        i++;
    }
    const html = `<div id="${id}-div"><p>${fragestellung}</p>${options}</div><hr>`;

    klausur.addKlausurHTML(html);
}

function createText(id, fragestellung) {
    const html = `<div id="${id}-div"><p>${fragestellung}</p><textarea class="form-control" name="${id}"></textarea></div><hr>`;
    klausur.addKlausurHTML(html);
}

module.exports = {
    aufgabenParse
}
