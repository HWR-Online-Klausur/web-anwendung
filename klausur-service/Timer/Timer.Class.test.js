const Timer = require('./Timer.Class');

Date.now = jest.fn(() => 1645081021128)

const timerTest = new Timer();


describe('Timer: constructor',() => {
    test('the attribut timerStart should be equal 1645081021128', () =>{
        expect(timerTest.timerStart).toStrictEqual(1645081021128);
    });

    test('the attribut timerTime should be equal 3600000', () =>{
        expect(timerTest.timerTime).toStrictEqual(3600000);
    });

    test('the attribut status should be equal false', () =>{
        expect(timerTest.status).toStrictEqual(false);
    });

    test('the attribut finished should be equal false', () =>{
        expect(timerTest.finished).toStrictEqual(false);
    });

    test('the attribut setTime should be a Function', () =>{
        expect(timerTest.setTime).toBeInstanceOf(Function);
    });

    test('the attribut startTimer should be a Function', () =>{
        expect(timerTest.startTimer).toBeInstanceOf(Function);
    });

    test('the attribut addTime should be a Function', () =>{
        expect(timerTest.addTime).toBeInstanceOf(Function);
    });

    test('the attribut convertTime should be a Function', () =>{
        expect(timerTest.convertTime).toBeInstanceOf(Function);
    });
})

describe('Timer: setTime',() => {
    test('the attribut timerTime should be equal 0', () =>{
        timerTest.setTime(0)
        expect(timerTest.timerTime).toEqual(0);
    });

    test('the attribut timerTime should be equal -60000', () =>{
        timerTest.setTime(-1)
        expect(timerTest.timerTime).toEqual(-60000);
    });

    test('the attribut timerTime should be equal 300000', () =>{
        timerTest.setTime(5)
        expect(timerTest.timerTime).toEqual(300000);
    });
})


describe('Timer: startTimer',() => {

    test('the attribute timerStart should be equal 1645081021128, attribute status should be true', () =>{
        timerTest.startTimer()
        expect(timerTest.timerStart).toEqual(1645081021128);
        expect(timerTest.status).toEqual(true);
    });
})


describe('Timer: addTime',() => {
    beforeEach(() => {
        timerTest.timerTime = 3600000;
        timerTest.finished = true;
    })

    test('the attribute timerTime should be equal 3660000, attribute finished should be false', () =>{
        timerTest.addTime(1)
        expect(timerTest.timerTime).toEqual(3660000);
        expect(timerTest.finished).toEqual(false);
    });

    test('the attribute timerTime should be equal 3600000, attribute finished should be true', () =>{
        timerTest.addTime(0)
        expect(timerTest.timerTime).toEqual(3600000);
        expect(timerTest.finished).toEqual(true);
    });

    test('the attribute timerTime should be equal 3540000, attribute finished should be true', () =>{
        timerTest.addTime(-1)
        expect(timerTest.timerTime).toEqual(3540000);
        expect(timerTest.finished).toEqual(true);
    });

    test('the attribute timerTime should be equal 3660004.2, attribute finished should be false', () =>{
        timerTest.addTime(1.00007)
        expect(timerTest.timerTime).toEqual(3660004.2);
        expect(timerTest.finished).toEqual(false);
    });

    test('the attribute timerTime should be equal 3539995.8, attribute finished should be true', () =>{
        timerTest.addTime(-1.00007)
        expect(timerTest.timerTime).toEqual(3539995.8);
        expect(timerTest.finished).toEqual(true);
    });


    test('the attribute timerTime should be equal 0, attribute finished should be true', () =>{
        timerTest.addTime(-60)
        expect(timerTest.timerTime).toEqual(0);
        expect(timerTest.finished).toEqual(true);
    });

    test('the attribute timerTime should be equal 0, attribute finished should be true', () =>{
        timerTest.addTime(-61)
        expect(timerTest.timerTime).toEqual(-60000);
        expect(timerTest.finished).toEqual(true);
    });
})


describe('Timer: convertTime',() => {

    test('convertTime should return 916 if we set 15 for stunden and 16 for minuten', () =>{
        expect(timerTest.convertTime(15, 16)).toEqual(916);
    });

    test('convertTime should return 916 we set string "15" for stunden and 16 for minuten', () =>{
        expect(timerTest.convertTime("15", 16)).toEqual(916);
    });

    test('convertTime should return 916 we set 15 for stunden and string "16" for minuten', () =>{
        expect(timerTest.convertTime(15, "16")).toEqual(916);
    });

    test('convertTime should return 916 we set string "15" for stunden and string "16" for minuten', () =>{
        expect(timerTest.convertTime("15", "16")).toEqual(916);
    });

    test('convertTime should return 106 if we set 1.5 for stunden and 16 for minuten', () =>{
        expect(timerTest.convertTime(1.5, 16)).toEqual(106);
    });

    test('convertTime should return 901.6 if we set 15 for stunden and 1.6 for minuten', () =>{
        expect(timerTest.convertTime(15, 1.6)).toEqual(901.6);
    });

    test('convertTime should return 106 if we set string "1.5" for stunden and 16 for minuten', () =>{
        expect(timerTest.convertTime("1.5", 16)).toEqual(106);
    });

    test('convertTime should return 901.6 if we set 15 for stunden and string "1.6" for minuten', () =>{
        expect(timerTest.convertTime(15, "1.6")).toEqual(901.6);
    });
})
