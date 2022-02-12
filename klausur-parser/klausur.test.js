const klausur = require('./klausur');
const assert = require("assert");

describe('klausur: constructor',() => {
    test('the attributes dozent, modul and aufgaben should be empty', () =>{
        assert.deepEqual(klausur,{
            dozent: "",
            modul: "",
            aufgaben: []
        })
    });
})

describe('klausur: getKlausur empty',() => {
    test('the attributes dozent, modul and aufgaben should be empty', () =>{
        const result = {
            "dozent": "",
            "modul": "",
            "aufgaben": []
        };
        expect(klausur.getKlausur()).toEqual(result);
    });
})

describe('klausur: setKlausur', () => {
    let obj
        obj = {
            dozent: "Dr. Dev",
            modul: "IT-1234",
            aufgaben: [
                {
                    "fragestellung": "Welche dieser Zahlen ist größer als 3?",
                    "methode": "multiple-choice",
                    "antworten": ["1", "3", "5", "-12"],
                    "id": "ab1"
                },
                {
                    "fragestellung": "Schreiben Sie drei Wörter",
                    "methode": "text",
                    "antworten": [],
                    "id": "ab2"
                },
                {
                    "fragestellung": "Schreiben Sie einen sehr ausführlichen Aufsatz",
                    "methode": "text",
                    "antworten": [],
                    "id": "ab3"
                },
                {
                    "fragestellung": "Sind Sie ein Roboter?",
                    "methode": "single-choice",
                    "antworten": ["Ja", "Nein"],
                    "id": "ab4"
                }
            ]
        }

    test('should set dozent to Dr. Dev', () => {
        klausur.setKlausur(obj)
        expect(klausur.dozent).toBe("Dr. Dev")
    })

    test('should set modul to IT-1234', () => {
        expect(klausur.modul).toBe("IT-1234")
    })

    test('should set aufgaben to result(see Code)', () => {
        const result = [
            {
                "fragestellung": "Welche dieser Zahlen ist größer als 3?",
                "methode": "multiple-choice",
                "antworten": ["1", "3", "5", "-12"],
                "id": "ab1"
            },
            {
                "fragestellung": "Schreiben Sie drei Wörter",
                "methode": "text",
                "antworten": [],
                "id": "ab2"
            },
            {
                "fragestellung": "Schreiben Sie einen sehr ausführlichen Aufsatz",
                "methode": "text",
                "antworten": [],
                "id": "ab3"
            },
            {
                "fragestellung": "Sind Sie ein Roboter?",
                "methode": "single-choice",
                "antworten": ["Ja", "Nein"],
                "id": "ab4"
            }
        ];
        expect(klausur.aufgaben).toEqual(result)
    })
})

describe('klausur: getKlausur with Data',() => {
    test('the attributes dozent, modul and aufgaben should not be empty and equal to the result (see Code)', () =>{
        const result = {
            "dozent": "Dr. Dev",
            "modul": "IT-1234",
            "aufgaben": [
                {
                    "fragestellung": "Welche dieser Zahlen ist größer als 3?",
                    "methode": "multiple-choice",
                    "antworten": ["1", "3", "5", "-12"],
                    "id": "ab1"
                },
                {
                    "fragestellung": "Schreiben Sie drei Wörter",
                    "methode": "text",
                    "antworten": [],
                    "id": "ab2"
                },
                {
                    "fragestellung": "Schreiben Sie einen sehr ausführlichen Aufsatz",
                    "methode": "text",
                    "antworten": [],
                    "id": "ab3"
                },
                {
                    "fragestellung": "Sind Sie ein Roboter?",
                    "methode": "single-choice",
                    "antworten": ["Ja", "Nein"],
                    "id": "ab4"
                }
            ]
        }

        expect(klausur.getKlausur()).toEqual(result);
    });
})

describe('klausur: getDozent',() => {
    test('the attributes dozent should be equal to Dr. Dev', () =>{
        expect(klausur.getDozent()).toEqual('Dr. Dev');
    });
})

describe('klausur: getModul',() => {
    test('the attributes modul equal to IT-1234', () =>{
        expect(klausur.getModul()).toEqual('IT-1234');
    });
});

describe('klausur: getAufgaben',() => {
    const result = [
        {
            "fragestellung": "Welche dieser Zahlen ist größer als 3?",
            "methode": "multiple-choice",
            "antworten": ["1", "3", "5", "-12"],
            "id": "ab1"
        },
        {
            "fragestellung": "Schreiben Sie drei Wörter",
            "methode": "text",
            "antworten": [],
            "id": "ab2"
        },
        {
            "fragestellung": "Schreiben Sie einen sehr ausführlichen Aufsatz",
            "methode": "text",
            "antworten": [],
            "id": "ab3"
        },
        {
            "fragestellung": "Sind Sie ein Roboter?",
            "methode": "single-choice",
            "antworten": ["Ja", "Nein"],
            "id": "ab4"
        }
    ];
    test('the attributes aufgaben should be equal to result(see Code)', () =>{
        expect(klausur.getAufgaben()).toEqual(result);
    });
})


