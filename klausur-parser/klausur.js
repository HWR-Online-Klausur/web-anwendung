class klausur{
    constructor() {
        this.Klausur = {
            "dozent": "",
            "modul": "",
            "aufgaben": []
        };
    }

    setKlausur(pKlausur) {
        if (pKlausur) {
            this.Klausur.dozent = pKlausur.dozent;
            this.Klausur.modul = pKlausur.modul;

            // Stellt sicher, dass jede ID einmalig ist
            for (const a of pKlausur.aufgaben) {
                if (this.Klausur.aufgaben.filter(kaf => kaf.id === a.id).length === 0) {
                    this.Klausur.aufgaben.push(a);
                }
            }
        }
    }

    getKlausur() {
        return this.Klausur;
    }

    getDozent() {
        return this.Klausur.dozent;
    }

    getModul() {
        return this.Klausur.modul;
    }

    getAufgaben() {
        return this.Klausur.aufgaben;
    }
}

module.exports = new klausur();
