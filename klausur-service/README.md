# Web

## API

### Timer
| URL                   | METHOD |                      PARAMETER                       |   ROLE   | DESCR.                                     |                                    RETURN                                     |
|-----------------------|:------:|:----------------------------------------------------:|:--------:|--------------------------------------------|:-----------------------------------------------------------------------------:|
| /api/timer/apiGetTime | `POST` |                 `{klausurID:string}`                 |  `none`  | Returns the current timer                  | ```{timerRemain:Date, timeOffset:number, finished:boolean, status:boolean}``` |
| /api/timer/start      | `POST` |                 `{klausurID:string}`                 | `dozent` | Starts the timer                           |                                    `none`                                     |
| /api/timer/reset      | `POST` |               ``{, klausurID:string}``               | `dozent` | Resets the timer                           |                                    `none`                                     |
| /api/timer            | `POST` |                 `{timerTime:number}`                 | `dozent` | Sets the timer time                        |                                    `none`                                     |
| /api/timer/convert    | `POST` | `{minuten:number, stunden:number, klausurID:string}` | `dozent` | Sets the timer time with minutes and hours |                                    `none`                                     |
| /api/timer/add        | `POST` |        `{timerTime:number, klausurID:string}`        | `dozent` | Adds time to the timer                     |                                    `none`                                     |

### Klausur
| URL                        | METHOD |     PARAMETER      |   ROLE   | DESCR.                                |          RETURN           |
|----------------------------|:------:|:------------------:|:--------:|---------------------------------------|:-------------------------:|
| /api/klausur/klausurStatus | `GET`  |       `none`       |  `none`  | Returns if the klausur is started     | `{klausurStatus:boolean}` |
| /api/klausur/getBody       | `GET`  |       `none`       |  `none`  | Returns the body for the Klausur html |      `<html></html>`      |
| /api/klausur/upload        | `POST` | `file:KlausurJSON` | `dozent` | Uploads the Klausur                   |          `none`           |

### Klausur Data
| URL                              | METHOD |   PARAMETER    |   ROLE    | DESCR.                       | RETURN |
|----------------------------------|:------:|:--------------:|:---------:|------------------------------|:------:|
| /api/klausurdata/saveKlausurData | `POST` | `form:Klausur` | `student` | Sends the filled out Klausur | `none` |

### Data
| URL                      | METHOD |               PARAMETER                |   ROLE    | DESCR.                                 |                    RETURN                     |
|--------------------------|:------:|:--------------------------------------:|:---------:|----------------------------------------|:---------------------------------------------:|
| /api/data/getAllStudents | `POST` |          `{klausurID:string}`          | `dozent`  | Returns all user only for this klausur |               `[{userSchema}]`                |
| /api/data/addStudent     | `POST` | `{name:string, matrikelnummer:string}` | `student` | Adds a new student to klausur          | `{'Registrierung erfolgreich abgeschlossen'}` |
| /api/data/deleteStudent  | `POST` | `{name:string, matrikelnummer:string}` | `student` | Deletes a student                      |        `{'User existiert nicht mehr'}`        |

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
