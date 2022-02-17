const klausurService = require('./klausur.service');
const DEV_TEST = require('../klausur-parser/DEV_TEST.json');
const Timer = require('../Timer/Timer.Class')

jest.mock('../Timer/Timer.Class')
// from Jest dok: Note that the mock can't be an arrow function because calling new on an arrow function is not allowed in JavaScript.


describe('klausurService: constructor',() => {
    test('the attribut klausurList should be empty', () =>{
        expect(klausurService.klausurList).toStrictEqual({});
    });
})

describe('klausurService: getKlausur',() => {
    beforeAll(() => {
        klausurService.klausurList[0] = {"klausur":DEV_TEST}
        klausurService.klausurList[123] = {"klausur": {"something": 123}}
        klausurService.klausurList[-1] = {"klausur": {"something": "another"}}
    })
    test('getKlausur with non valid data should return null', () =>{
        expect(klausurService.getKlausur()).toEqual(null);
        expect(klausurService.getKlausur(undefined)).toEqual(null);
        expect(klausurService.getKlausur(null)).toEqual(null);
    });

    test('getKlausur with valid data should return undefinde if it there no match', () =>{
        expect(klausurService.getKlausur(777)).toEqual(undefined);
        expect(klausurService.getKlausur(-123)).toEqual(undefined);
        expect(klausurService.getKlausur({})).toEqual(undefined);
    });

    test('getKlausur with valid data should return klausur if it there a match', () =>{
        expect(klausurService.getKlausur(0)).toEqual(DEV_TEST);
        expect(klausurService.getKlausur(123)).toEqual({"something": 123});
        expect(klausurService.getKlausur(-1)).toEqual({"something": "another"});
    });
})

describe('klausurService: setKlausur',() => {
    beforeAll(() => {
        klausurService.klausurList = {};
    })

    test('setKlausur with non valid data should return null', () =>{
        expect(klausurService.setKlausur()).toEqual(null);
        expect(klausurService.setKlausur(undefined)).toEqual(null);
        expect(klausurService.setKlausur(null)).toEqual(null);
    });

    test('setKlausur with valid data should should add a klausur to klausurList attribute', () =>{
        klausurService.setKlausur(4, DEV_TEST);
        expect(klausurService.klausurList).toEqual({"4": {"klausur":DEV_TEST}});
        expect(Object.keys(klausurService.klausurList).length).toEqual(1);
    });
    test('setKlausur with valid data should shoud add an another klausur to klausurList attribute and we expect 2 klausuren in there', () =>{
        klausurService.setKlausur(3, DEV_TEST);
        expect(Object.keys(klausurService.klausurList).length).toEqual(2);
    });
})

describe('klausurService: getStatus',() => {
    beforeAll(() => {
        klausurService.klausurList = {};
        klausurService.klausurList[0] = {"klausur":DEV_TEST, "status": true};
        klausurService.klausurList[-1] = {"klausur":DEV_TEST, "status": false};
        klausurService.klausurList[123] = {"klausur": {"something": 123}};
    })

    test('getStatus with non valid data should return null', () =>{
        expect(klausurService.getStatus()).toEqual(null);
        expect(klausurService.getStatus(undefined)).toEqual(null);
        expect(klausurService.getStatus(null)).toEqual(null);
    });

    test('getStatus with valid data should should return status undefinded if there no ID', () =>{
        expect(klausurService.getStatus(4)).toEqual(undefined);
    });

    test('getStatus with valid data should should return status undefinded if there no status', () =>{
        expect(klausurService.getStatus(123)).toEqual(undefined);
    });

    test('getStatus with valid data should should return status true', () =>{
        expect(klausurService.getStatus(0)).toEqual(true);
    });

    test('getStatus with valid data should should return status false', () =>{
        expect(klausurService.getStatus(-1)).toEqual(false);
    });
})

describe('klausurService: setStatus',() => {
    beforeAll(() => {
        klausurService.klausurList = {};
        klausurService.klausurList[0] = {"klausur":DEV_TEST};
        klausurService.klausurList[-1] = {"klausur":DEV_TEST};
        klausurService.klausurList[123] = {"klausur": {"something": 123}};
    })

    test('setStatus with non valid data should return null', () =>{
        expect(klausurService.setStatus()).toEqual(null);
        expect(klausurService.setStatus(undefined)).toEqual(null);
        expect(klausurService.setStatus(null)).toEqual(null);
    });


    test('setStatus with valid data should set status false', () =>{
        klausurService.setStatus(123, false);
        expect(klausurService.klausurList[123].status).toEqual(false);
    });

    test('setStatus with valid data should set status false', () =>{
        klausurService.setStatus(0, true);
        expect(klausurService.klausurList[0].status).toEqual(true);
    });

    test('setStatus with valid data should set status null', () =>{
        klausurService.setStatus(-1, null);
        expect(klausurService.klausurList[-1].status).toEqual(null);
    });
})

describe('klausurService: getTimer',() => {
    beforeAll(() => {
        klausurService.klausurList = {};
        klausurService.klausurList[0] = {"klausur":DEV_TEST, "timer": new Timer() };
    })

    test('getTimer with non valid data should return null', () =>{
        expect(klausurService.getTimer()).toEqual(null);
        expect(klausurService.getTimer(undefined)).toEqual(null);
        expect(klausurService.getTimer(null)).toEqual(null);
    });


    test('setTimer with mocked data should get the right output', () =>{
        expect(klausurService.getTimer(0)).toEqual({"finished": false, "status": false, "timerStart": 1645081021128, "timerTime": 3600000});
    });

})


describe('klausurService: getOrSetTimer',() => {
    beforeAll(() => {
        klausurService.klausurList = {};
        klausurService.klausurList[0] = {"klausur":DEV_TEST, "timer": new Timer() };
        klausurService.klausurList[123] = {"klausur":DEV_TEST};
    })

    test('getOrSetTimer with non valid data should return null', () =>{
        expect(klausurService.getOrSetTimer()).toEqual(null);
        expect(klausurService.getOrSetTimer(undefined)).toEqual(null);
        expect(klausurService.getOrSetTimer(null)).toEqual(null);
    });


    test('getOrSetTimer should return Timer', () =>{
        expect(klausurService.getOrSetTimer(0)).toEqual({"finished": false, "status": false, "timerStart": 1645081021128, "timerTime": 3600000});
    });

    test('getOrSetTimer should set Timer and get it back', () =>{
        expect(klausurService.getOrSetTimer(123)).toEqual({"finished": false, "status": false, "timerStart": 1645081021128, "timerTime": 3600000});
    });

})


describe('klausurService: createTimer',() => {
    beforeAll(() => {
        klausurService.klausurList = {};
        klausurService.klausurList[0] = {"klausur":DEV_TEST};
        klausurService.klausurList[123] = {"klausur":DEV_TEST};
    })

    test('createTimer with non valid data should return null', () =>{
        expect(klausurService.createTimer()).toEqual(null);
        expect(klausurService.createTimer(undefined)).toEqual(null);
        expect(klausurService.createTimer(null)).toEqual(null);
    });


    test('createTimer should set Timer to klausurService.klausurList[0].timer', () =>{
        klausurService.createTimer(0);
        expect(klausurService.klausurList[0].timer).toEqual({"finished": false, "status": false, "timerStart": 1645081021128, "timerTime": 3600000});
    });

    test('klausurService.klausurList[123].timer should be undefined', () =>{
        expect(klausurService.klausurList[123].timer).toEqual(undefined);
    });

})


describe('klausurService: removeKlausur',() => {
    beforeAll(() => {
        klausurService.klausurList = {};
        klausurService.klausurList[0] = {"klausur":DEV_TEST};
        klausurService.klausurList[123] = {"klausur":DEV_TEST};
    })

    test('removeKlausur with non valid data should return null', () =>{
        expect(klausurService.removeKlausur()).toEqual(null);
        expect(klausurService.removeKlausur(undefined)).toEqual(null);
        expect(klausurService.removeKlausur(null)).toEqual(null);
    });


    test('removeKlausur should delete klausurService.klausurList[0]', () =>{
        klausurService.removeKlausur(0);
        expect(klausurService.klausurList[0]).toEqual(undefined);
    });

    test('klausurService.klausurList[124] is not existing, it should be undefined', () =>{
        expect(klausurService.klausurList[124]).toEqual(undefined);
    });

})
