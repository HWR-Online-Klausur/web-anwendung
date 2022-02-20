const klausur = require('./klausur');
const assert = require("assert");

let k = new klausur();

describe('klausur: constructor',() => {
    test('the attributes dozent, modul, aufgaben and titel should be empty', () =>{
        assert.deepEqual(k,{
            id: "",
            titel: "",
            dozent: "",
            modul: "",
            aufgaben: []
        })
    });
})

describe('klausur: getKlausur empty',() => {
    test('the attributes dozent, modul, aufgaben and titel should be empty', () =>{
        const result = {
            "id": "",
            "titel": "",
            "dozent": "",
            "modul": "",
            "aufgaben": []
        };
        expect(k.getKlausur()).toEqual(result);
    });
})

describe('klausur: setKlausur', () => {
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
                    "fragestellung": "Schreiben Sie einen sehr ausführlichen Aufsatz",
                    "methode": 0,
                    "antworten": [],
                    "id": "ab3"
                },
                {
                    "fragestellung": "Sind Sie ein Roboter?",
                    "methode": 1,
                    "antworten": ["Ja", "Nein"],
                    "id": "ab4"
                }
            ]
        }

    test('should set dozent to Dr. Dev', () => {
        k.setKlausur(obj)
        expect(k.dozent).toBe("Dr. Dev")
    })

    test('should set modul to IT-1234', () => {
        expect(k.modul).toBe("IT-1234")
    })

    test('should set aufgaben to result(see Code)', () => {
        const result = [
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
                "fragestellung": "Schreiben Sie einen sehr ausführlichen Aufsatz",
                "methode": 0,
                "antworten": [],
                "id": "ab3"
            },
            {
                "fragestellung": "Sind Sie ein Roboter?",
                "methode": 1,
                "antworten": ["Ja", "Nein"],
                "id": "ab4"
            }
        ];
        expect(k.aufgaben).toEqual(result)
    })
})

describe('klausur: getKlausur with Data',() => {
    test('the attributes dozent, modul and aufgaben should not be empty and equal to the result (see Code)', () =>{
        const result = {
            "titel": "Test Titel",
            "dozent": "Dr. Dev",
            "modul": "IT-1234",
            "aufgaben": [
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
                    "fragestellung": "Schreiben Sie einen sehr ausführlichen Aufsatz",
                    "methode": 0,
                    "antworten": [],
                    "id": "ab3"
                },
                {
                    "fragestellung": "Sind Sie ein Roboter?",
                    "methode": 1,
                    "antworten": ["Ja", "Nein"],
                    "id": "ab4"
                }
            ]
        }

        expect(k.getKlausur()).toEqual(result);
    });
})

describe('klausur: getDozent',() => {
    test('the attributes dozent should be equal to Dr. Dev', () =>{
        expect(k.getDozent()).toEqual('Dr. Dev');
    });
})

describe('klausur: getModul',() => {
    test('the attributes modul equal to IT-1234', () =>{
        expect(k.getModul()).toEqual('IT-1234');
    });
});

describe('klausur: getAufgaben',() => {
    const result = [
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
            "fragestellung": "Schreiben Sie einen sehr ausführlichen Aufsatz",
            "methode": 0,
            "antworten": [],
            "id": "ab3"
        },
        {
            "fragestellung": "Sind Sie ein Roboter?",
            "methode": 1,
            "antworten": ["Ja", "Nein"],
            "id": "ab4"
        }
    ];
    test('the attributes aufgaben should be equal to result(see Code)', () =>{
        expect(k.getAufgaben()).toEqual(result);
    });
})


