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

}

module.exports = new KlausurHTML();
