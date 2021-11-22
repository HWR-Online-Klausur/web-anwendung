const klausur = require('./klausur');
const assert = require("assert");

test('When creating a class klausur, the attributes dozent, modul and aufgaben must be empty', () =>{
    assert.deepEqual(klausur,{
        dozent: "",
        modul: "",
        aufgaben: []
    })
});
