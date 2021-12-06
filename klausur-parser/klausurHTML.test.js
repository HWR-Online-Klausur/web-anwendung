const klausurHTML = require('./klausurHTML');
const assert = require("assert");

describe('klausurHTML: constructor',() => {
    test('the attribut KlausurHTML should be empty', () =>{
        assert.deepEqual(klausurHTML,{
            KlausurHTML: []
        })
    });
})

describe('klausurHTML: addKlausurHTML',() => {
    test('after we push our string to the klausurHTML attribut KlausurHTML should contain it', () =>{
        const stirng = `<div id="ab3-div"><p>Schreiben Sie einen sehr ausführlichen Aufsatz</p><textarea class="form-control" name="ab3"></textarea></div><hr>`;
        klausurHTML.addKlausurHTML(stirng);
        expect(klausurHTML.KlausurHTML).toContain(`<div id="ab3-div"><p>Schreiben Sie einen sehr ausführlichen Aufsatz</p><textarea class="form-control" name="ab3"></textarea></div><hr>`)
    });

    test('after we push another one string to the klausurHTML attribut KlausurHTML should contain both of it', () =>{
        const stirng = `<div id="ab4-div"><p>Sind Sie ein Roboter?</p><input class="form-check-input" type="radio" id="ab3" name="ab4" value="Ja"><label class="form-check-label" for="ab3">Ja</label> <br> <input class="form-check-input" type="radio" id="ab3" name="ab4" value="Nein"><label class="form-check-label" for="ab3">Nein</label> <br></div><hr>`;
        klausurHTML.addKlausurHTML(stirng);
        expect(klausurHTML.KlausurHTML).toContain(`<div id="ab3-div"><p>Schreiben Sie einen sehr ausführlichen Aufsatz</p><textarea class="form-control" name="ab3"></textarea></div><hr>`)
        expect(klausurHTML.KlausurHTML).toContain(`<div id="ab4-div"><p>Sind Sie ein Roboter?</p><input class="form-check-input" type="radio" id="ab3" name="ab4" value="Ja"><label class="form-check-label" for="ab3">Ja</label> <br> <input class="form-check-input" type="radio" id="ab3" name="ab4" value="Nein"><label class="form-check-label" for="ab3">Nein</label> <br></div><hr>`)
    });
})

describe('klausurHTML: getKlausurHTML',() => {
    test('the attribute KlausurHTML should not be empty and equal to the result (see Code)', () =>{
        const result = [`<div id="ab3-div"><p>Schreiben Sie einen sehr ausführlichen Aufsatz</p><textarea class="form-control" name="ab3"></textarea></div><hr>`,
            `<div id="ab4-div"><p>Sind Sie ein Roboter?</p><input class="form-check-input" type="radio" id="ab3" name="ab4" value="Ja"><label class="form-check-label" for="ab3">Ja</label> <br> <input class="form-check-input" type="radio" id="ab3" name="ab4" value="Nein"><label class="form-check-label" for="ab3">Nein</label> <br></div><hr>`]

        expect(klausurHTML.getKlausurHTML()).toEqual(result);
    });
})

describe('klausurHTML: clearKlausurHTML',() => {
    test('the attribut KlausurHTML should be empty', () =>{
        klausurHTML.clearKlausurHTML();
        assert.deepEqual(klausurHTML,{
            KlausurHTML: []
        })
    });
})
