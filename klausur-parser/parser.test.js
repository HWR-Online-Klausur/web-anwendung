const {createMultipleChoice, createSingleChoice, createText} = require('./parser');

describe('createMultipleChoice',() => {
    test('should not be empty and equal to the result (see Code)', () =>{
        const result = '<div id="ab1-div"><p>Welche dieser Zahlen ist größer als 3?</p><input class="form-check-input" type="checkbox" id="ab1-0" name="ab1-0" value="1"><label class="form-check-label" for="ab1-0">1</label> <br><input class="form-check-input" type="checkbox" id="ab1-1" name="ab1-1" value="3"><label class="form-check-label" for="ab1-1">3</label> <br><input class="form-check-input" type="checkbox" id="ab1-2" name="ab1-2" value="5"><label class="form-check-label" for="ab1-2">5</label> <br><input class="form-check-input" type="checkbox" id="ab1-3" name="ab1-3" value="-12"><label class="form-check-label" for="ab1-3">-12</label> <br></div><hr>'
        expect(createMultipleChoice("ab1","Welche dieser Zahlen ist größer als 3?", ["1", "3", "5", "-12"])).toEqual(result);
    });
})

describe('createSingleChoice',() => {
    test('should not be empty and equal to the result (see Code)', () =>{
        const result ='<div id="ab4-div"><p>Sind Sie ein Roboter?</p><input class="form-check-input" type="radio" id="ab4-0" name="ab4" value="Ja"><label class="form-check-label" for="ab4-0">Ja</label> <br><input class="form-check-input" type="radio" id="ab4-1" name="ab4" value="Nein"><label class="form-check-label" for="ab4-1">Nein</label> <br></div><hr>'
        expect(createSingleChoice("ab4","Sind Sie ein Roboter?", ["Ja", "Nein"])).toEqual(result);
    });
})

describe('createText',() => {
    test('should not be empty and equal to the result (see Code)', () =>{
        const result = '<div id="ab2-div"><p>Schreiben Sie drei Wörter</p><textarea class="form-control" name="ab2"></textarea></div><hr>'
        expect(createText("ab2","Schreiben Sie drei Wörter", [])).toEqual(result);
    });
})
