/**
 *
 *  PARSE OPS
 *
 */


function createMultipleChoice(id, fragestellung, antworten) {
    let options = "";
    let i = 0;
    for (const a of antworten) {
        const tempID = `${id}-${i}`;
        options += `<input class="form-check-input" type="checkbox" id="${tempID}" name="${tempID}" value="${a}"><label class="form-check-label" for="${tempID}">${a}</label> <br>`;
        i++;
    }
    const html = `<div id="${id}-div"><p>${fragestellung}</p>${options}</div><hr>`;

    return html;
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

    return html;
}

function createText(id, fragestellung) {
    const html = `<div id="${id}-div"><p>${fragestellung}</p><textarea class="form-control" name="${id}"></textarea></div><hr>`;

    return html;
}

module.exports = {
    createMultipleChoice,
    createSingleChoice,
    createText
}
