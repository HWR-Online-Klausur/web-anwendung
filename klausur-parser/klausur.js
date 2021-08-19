let Klausur = {
    "dozent": "",
    "modul": "",
    "aufgaben": []
};

let KlausurHTML = [];

function setKlausur(pKlausur) {
    if (pKlausur) {
        Klausur.dozent = pKlausur.dozent;
        Klausur.modul = pKlausur.modul;

        // Stellt sicher, dass jede ID einmalig ist
        for (const a of pKlausur.aufgaben) {
            if (Klausur.aufgaben.filter(kaf => kaf.id === a.id).length === 0) {
                Klausur.aufgaben.push(a);
            }
        }
    }
}

function getKlausur() {
    return Klausur;
}

function getDozent() {
    return Klausur.dozent;
}

function getModul() {
    return Klausur.modul;
}

function getAufgaben() {
    return Klausur.aufgaben;
}

function addKlausurHTML(html) {
    KlausurHTML.push(html);
}

function clearKlausurHTML() {
    KlausurHTML = [];
}

function getKlausurHTML() {
    return KlausurHTML;
}

module.exports = {
    setKlausur,
    getKlausur,
    getDozent,
    getModul,
    getAufgaben,
    addKlausurHTML,
    clearKlausurHTML,
    getKlausurHTML
}
