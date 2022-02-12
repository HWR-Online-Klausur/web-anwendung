class klausur {

    constructor(pKlausur) {
        if (pKlausur) {
            this.titel = pKlausur.titel;
            this.dozent = pKlausur.dozent;
            this.modul = pKlausur.modul;
            this.aufgaben = [...pKlausur.aufgaben];
        } else {
            this.titel = "";
            this.dozent = "";
            this.modul = "";
            this.aufgaben =  [];
        }
    }

    setKlausur(pKlausur) {
        if (pKlausur) {
            this.titel = pKlausur.titel
            this.dozent = pKlausur.dozent;
            this.modul = pKlausur.modul;

            // Stellt sicher, dass jede ID einmalig ist
            for (const a of pKlausur.aufgaben) {
                if (this.aufgaben.filter(kaf => kaf.id === a.id).length === 0) {
                    this.aufgaben.push(a);
                }
            }
        }
    }

    getKlausur() {
        return this;
    }

    getDozent() {
        return this.dozent;
    }

    getModul() {
        return this.modul;
    }

    getAufgaben() {
        return this.aufgaben;
    }

    getTitel() {
        return this.titel;
    }
}

module.exports = klausur;
