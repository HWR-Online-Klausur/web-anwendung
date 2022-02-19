const klausurHTML = require('./klausurHTML');
const assert = require("assert");

let kHTML = new klausurHTML();

describe('klausurHTML: constructor',() => {
    test('the attribut KlausurHTML should be empty', () =>{
        assert.deepEqual(kHTML,{
            KlausurHTML: []
        })
    });
})

describe('klausurHTML: addKlausurHTML',() => {
    test('after we push our string to the klausurHTML attribut KlausurHTML should contain it', () =>{
        const stirng = `<div id="ab3-div"><p>Schreiben Sie einen sehr ausführlichen Aufsatz</p><textarea class="form-control" name="ab3"></textarea></div><hr>`;
        kHTML.addKlausurHTML(stirng);
        expect(kHTML.KlausurHTML).toContain(`<div id="ab3-div"><p>Schreiben Sie einen sehr ausführlichen Aufsatz</p><textarea class="form-control" name="ab3"></textarea></div><hr>`)
    });

    test('after we push another one string to the klausurHTML attribut KlausurHTML should contain both of it', () =>{
        const stirng = `<div id="ab4-div"><p>Sind Sie ein Roboter?</p><input class="form-check-input" type="radio" id="ab3" name="ab4" value="Ja"><label class="form-check-label" for="ab3">Ja</label> <br> <input class="form-check-input" type="radio" id="ab3" name="ab4" value="Nein"><label class="form-check-label" for="ab3">Nein</label> <br></div><hr>`;
        kHTML.addKlausurHTML(stirng);
        expect(kHTML.KlausurHTML).toContain(`<div id="ab3-div"><p>Schreiben Sie einen sehr ausführlichen Aufsatz</p><textarea class="form-control" name="ab3"></textarea></div><hr>`)
        expect(kHTML.KlausurHTML).toContain(`<div id="ab4-div"><p>Sind Sie ein Roboter?</p><input class="form-check-input" type="radio" id="ab3" name="ab4" value="Ja"><label class="form-check-label" for="ab3">Ja</label> <br> <input class="form-check-input" type="radio" id="ab3" name="ab4" value="Nein"><label class="form-check-label" for="ab3">Nein</label> <br></div><hr>`)
    });
})

describe('klausurHTML: getKlausurHTML',() => {
    test('the attribute KlausurHTML should not be empty and equal to the result (see Code)', () =>{
        const result = [`<div id="ab3-div"><p>Schreiben Sie einen sehr ausführlichen Aufsatz</p><textarea class="form-control" name="ab3"></textarea></div><hr>`,
            `<div id="ab4-div"><p>Sind Sie ein Roboter?</p><input class="form-check-input" type="radio" id="ab3" name="ab4" value="Ja"><label class="form-check-label" for="ab3">Ja</label> <br> <input class="form-check-input" type="radio" id="ab3" name="ab4" value="Nein"><label class="form-check-label" for="ab3">Nein</label> <br></div><hr>`]

        expect(kHTML.getKlausurHTML()).toEqual(result);
    });
})

describe('klausurHTML: clearKlausurHTML',() => {
    test('the attribut KlausurHTML should be empty', () =>{
        kHTML.clearKlausurHTML();
        assert.deepEqual(kHTML,{
            KlausurHTML: []
        })
    });
})

describe('klausurHTML: aufgabenParse',() => {
    let obj
    obj = {
        titel: "Test Titel",
        dozent: "Dr. Dev",
        modul: "IT-1234",
        aufgaben: [
            {
                "fragestellung": "Welche dieser Zahlen ist größer als 3?",
                "methode": 2,
                "antworten": ["1", "3", "5", "-12"],
                "id": "ab1"
            },
            {
                "fragestellung": "Schreiben Sie drei Wörter",
                "methode": 0,
                "antworten": [],
                "id": "ab2"
            },
            {
                "fragestellung": "Sind Sie ein Roboter?",
                "methode": 1,
                "antworten": ["Ja", "Nein"],
                "id": "ab4"
            }
        ]
    }
    test('the attribut KlausurHTML should be empty if we use non valid data', () =>{
        kHTML.aufgabenParse(obj);
        assert.deepEqual(kHTML,{
            KlausurHTML: []
        })
    });

    test('the attribut KlausurHTML should not be empty if we use a valid data', () =>{
        kHTML.aufgabenParse(obj.aufgaben);
        assert.notDeepEqual(kHTML,{
            KlausurHTML: []
        })
    });

    test('the attribut KlausurHTML should not be empty and equal to the result (see Code)', () =>{
        const result = [
            '<div id="ab1-div"><p>Welche dieser Zahlen ist größer als 3?</p><input class="form-check-input" type="checkbox" id="ab1-0" name="ab1-0" value="1"><label class="form-check-label" for="ab1-0">1</label> <br><input class="form-check-input" type="checkbox" id="ab1-1" name="ab1-1" value="3"><label class="form-check-label" for="ab1-1">3</label> <br><input class="form-check-input" type="checkbox" id="ab1-2" name="ab1-2" value="5"><label class="form-check-label" for="ab1-2">5</label> <br><input class="form-check-input" type="checkbox" id="ab1-3" name="ab1-3" value="-12"><label class="form-check-label" for="ab1-3">-12</label> <br></div><hr>',
            '<div id="ab2-div"><p>Schreiben Sie drei Wörter</p><textarea class="form-control" name="ab2"></textarea></div><hr>',
            '<div id="ab4-div"><p>Sind Sie ein Roboter?</p><input class="form-check-input" type="radio" id="ab4-0" name="ab4" value="Ja"><label class="form-check-label" for="ab4-0">Ja</label> <br><input class="form-check-input" type="radio" id="ab4-1" name="ab4" value="Nein"><label class="form-check-label" for="ab4-1">Nein</label> <br></div><hr>'
        ]

        kHTML.aufgabenParse(obj.aufgaben);
        expect(kHTML.getKlausurHTML()).toEqual(result)
    });
})
