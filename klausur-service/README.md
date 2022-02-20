# Web

## API

### Timer
| URL                   | METHOD |                      PARAMETER                       |   ROLE   | DESCR.                                           |                                    RETURN                                     |
|-----------------------|:------:|:----------------------------------------------------:|:--------:|--------------------------------------------------|:-----------------------------------------------------------------------------:|
| /api/timer            | `GET`  |                        `none`                        |  `none`  | Returns the current timer (klausurID in session) | ```{timerRemain:Date, timeOffset:number, finished:boolean, status:boolean}``` |
| /api/timer/apiGetTime | `POST` |                 `{klausurID:string}`                 |  `none`  | Returns the current timer                        | ```{timerRemain:Date, timeOffset:number, finished:boolean, status:boolean}``` |
| /api/timer/start      | `POST` |                 `{klausurID:string}`                 | `dozent` | Starts the timer                                 |                                    `none`                                     |
| /api/timer/reset      | `POST` |                ``{klausurID:string}``                | `dozent` | Resets the timer                                 |                                    `none`                                     |
| /api/timer            | `POST` |        `{klausurID:string, timerTime:number}`        | `dozent` | Sets the timer time                              |                                    `none`                                     |
| /api/timer/convert    | `POST` | `{minuten:number, stunden:number, klausurID:string}` | `dozent` | Sets the timer time with minutes and hours       |                                    `none`                                     |
| /api/timer/add        | `POST` |        `{timerTime:number, klausurID:string}`        | `dozent` | Adds time to the timer                           |                                    `none`                                     |

### Klausur
| URL                          | METHOD |     PARAMETER      |   ROLE   | DESCR.                                                                      |          RETURN           |
|------------------------------|:------:|:------------------:|:--------:|-----------------------------------------------------------------------------|:-------------------------:|
| /api/klausur/klausurStatus   | `GET`  |       `none`       |  `none`  | Returns if the klausur is started (klausurID in session cookie)             | `{klausurStatus:boolean}` |
| /api/klausur/getBody         | `GET`  |       `none`       |  `none`  | Returns the body for the Klausur html (klausurID in session cookie)         |      `<html></html>`      |
| /api/klausur/upload          | `POST` |    `{klausur}`     | `dozent` | Uploads the Klausur                                                         |          `none`           |
| /api/klausur/upload/form     | `POST` | `file:KlausurJSON` | `dozent` | Uploads the Klausur                                                         |          `none`           |
| /api/klausur/getAllKlausuren | `POST` |       `none`       | `dozent` | Returns all Klausuren of the Dozent (requires DozentDBID in session cookie) |   `[file:KlausurJSON]`    |

### Klausur Data
| URL                                           | METHOD |                  PARAMETER                  |   ROLE    | DESCR.                                         |            RETURN            |
|-----------------------------------------------|:------:|:-------------------------------------------:|:---------:|------------------------------------------------|:----------------------------:|
| /api/klausurdata/saveKlausurData              | `POST` |               `form:Klausur`                | `student` | Sends and saves the filled out Klausur         |            `none`            |
| /api/klausurdata/downloadKlausurData          | `POST` | `{klausurID:string, matrikelnummer:string}` | `dozent`  | Downloads a specific filled out Klausur        |    `file:Klausur as PDF`     |
| /api/klausurdata/getKlausurData               | `POST` |            `{klausurID:string}`             | `dozent`  | Returns all filled out Klausuren for a Klausur |         `[Klausur]`          |
| /api/klausurdata/checkIfStudentsPassedKlausur | `POST` | `{klausurID:string, matrikelnummer:string}` | `dozent`  | Checks if the Klausur was saved                | `{"Klausur wurde gefunden"}` |

### User
| URL                           | METHOD |                   PARAMETER                   |   ROLE    | DESCR.                                                      |                    RETURN                     |
|-------------------------------|:------:|:---------------------------------------------:|:---------:|-------------------------------------------------------------|:---------------------------------------------:|
| /api/user/getAllStudents      | `POST` |             `{klausurID:string}`              | `dozent`  | Returns all user only for this klausur                      |               `[{userSchema}]`                |
| /api/user/getAllDozents       | `GET`  |                    `none`                     | `dozent`  | Returns all Dozents                                         |              `[{dozentSchema}]`               |
| /api/user/addStudent          | `POST` |    `{name:string, matrikelnummer:string}`     | `student` | Adds a new student to klausur (klausurID in session cookie) | `{'Registrierung erfolgreich abgeschlossen'}` |
| /api/user/deleteStudent       | `POST` |    `{name:string, matrikelnummer:string}`     | `student` | Deletes a student                                           |        `{'User existiert nicht mehr'}`        |
| /api/user/addStudentKlausurID | `POST` |             `{klausurID:string}`              |  `none`   | Sets the klausurID in the session cookie                    |                    `none`                     |
| /api/user/loginDozent         | `POST` |       `{mail:string, password:string}`        |  `none`   | Logs the Dozent in                                          |                    `none`                     |
| /api/user/logout              | `GET`  |                    `none`                     | `dozent`  | Logs the user out                                           |                    `none`                     |
| /api/user/addDozent           | `POST` | `{mail:string, password:string, name:string}` | `dozent`  | Registers a new Dozent                                      | `{"Registrierung erfolgreich abgeschlossen"}` |
| /api/userdeleteDozent         | `POST` |                `{mail:string}`                | `dozent`  | Deletes a Dozent account                                    |        `{"User existiert nicht mehr"}`        |

## Klausur JSON
```
{
  "titel": "Ein Titel",
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
```

## ID der Klausur

Wenn die Klausur mittels /api/klausur/getAllKlausuren erhalten wird, dann ist die ID der Klausur in `_id`
