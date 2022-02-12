# Web

## API

### Timer
| URL                | METHOD |             PARAMETER              |   ROLE   | DESCR.                                     |                                    RETURN                                     |
|--------------------|:------:|:----------------------------------:|:--------:|--------------------------------------------|:-----------------------------------------------------------------------------:|
| /api/timer         | `GET`  |               `none`               |  `none`  | Returns the current timer                  | ```{timerRemain:Date, timeOffset:number, finished:boolean, status:boolean}``` |
| /api/timer/start   | `GET`  |               `none`               | `dozent` | Starts the timer                           |                                    `none`                                     |
| /api/timer/reset   | `GET`  |               `none`               | `dozent` | Resets the timer                           |                                    `none`                                     |
| /api/timer         | `POST` |        `{timerTime:number}`        | `dozent` | Sets the timer time                        |                                    `none`                                     |
| /api/timer/convert | `POST` | `{minuten:number, stunden:number}` | `dozent` | Sets the timer time with minutes and hours |                                    `none`                                     |
| /api/timer/add     | `POST` |        `{timerTime:number}`        | `dozent` | Adds time to the timer                     |                                    `none`                                     |

### Klausur
| URL                        | METHOD |     PARAMETER      |   ROLE   | DESCR.                                |          RETURN           |
|----------------------------|:------:|:------------------:|:--------:|---------------------------------------|:-------------------------:|
| /api/klausur/klausurStatus | `GET`  |       `none`       |  `none`  | Returns if the klausur is started     | `{klausurStatus:boolean}` |
| /api/klausur/getBody       | `GET`  |       `none`       |  `none`  | Returns the body for the Klausur html |      `<html></html>`      |
| /api/klausur/jsonRead      | `POST` | `file:KlausurJSON` | `dozent` | Uploads the Klausur                   |          `none`           |

### Klausur Data
| URL                              | METHOD |   PARAMETER    |   ROLE    | DESCR.                       | RETURN |
|----------------------------------|:------:|:--------------:|:---------:|------------------------------|:------:|
| /api/klausurdata/saveKlausurData | `POST` | `form:Klausur` | `student` | Sends the filled out Klausur | `none` |

### Data
| URL                     | METHOD |               PARAMETER                |   ROLE    | DESCR.                                                                 |                    RETURN                     |
|-------------------------|:------:|:--------------------------------------:|:---------:|------------------------------------------------------------------------|:---------------------------------------------:|
| /api/data/alluser       | `GET`  |                 `none`                 | `dozent`  | Returns all user (should be only for this klausur)                     |               `[{userSchema}]`                |
| /api/data/getUpdatePing | `GET`  |                 `none`                 | `dozent`  | Returns ping that users have changed (should be only for this klausur) |            `{updatePing:boolean}`             |
| /api/data/addUser       | `POST` | `{name:string, matrikelnummer:string}` | `student` | Adds a new student to klausur                                          | `{'Registrierung erfolgreich abgeschlossen'}` |
| /api/data/deleteUser    | `POST` | `{name:string, matrikelnummer:string}` | `student` | Deletes a student                                                      |        `{'User existiert nicht mehr'}`        |

## Klausur JSON
```
{
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
```
