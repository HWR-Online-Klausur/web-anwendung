const { createMultipleChoice, createSingleChoice, createText } = require('./parser');

class KlausurHTML{
    constructor() {
        this.KlausurHTML = [];
    }

    addKlausurHTML(html) {
        this.KlausurHTML.push(html);
    }

    clearKlausurHTML() {
        this.KlausurHTML = [];
    }

    getKlausurHTML() {
        return this.KlausurHTML;
    }

    aufgabenParse(klausur) {
        this.clearKlausurHTML();
        for (const a of klausur) {
            switch (a.methode) {
                case 'multiple-choice':
                    this.addKlausurHTML(createMultipleChoice(a.id, a.fragestellung, a.antworten));
                    break;
                case 'single-choice':
                    this.addKlausurHTML(createSingleChoice(a.id, a.fragestellung, a.antworten));
                    break;
                case 'text':
                    this.addKlausurHTML(createText(a.id, a.fragestellung));
                    break;
                default: break;
            }
        }
    }

}

module.exports = new KlausurHTML();
