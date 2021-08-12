//Change input Student Data
const inputName = document.getElementById("studentenNameInput");
const inputNummer = document.getElementById("studentenMatrikelnummerInput");

inputName.addEventListener('change', updateDataStatus);
inputNummer.addEventListener('change', updateDataStatus);

function updateDataStatus() {
    const status = document.getElementById("studentDataStatus");
    status.innerText = "";
    setTimeout(()=>{
        status.innerText = "Angabe wurde gespeichert!";
    }, 5000);
}

//Change Klausurstatus





function updateKlausurstatus(){
    setTimeout(()=> {

        fetch("/api/klausurStatus")
            .then(res => {
                return res.json();
            })
            .then(klausurStatus => {
                const status = document.getElementById("klausurstatus")
                if (klausurStatus) {
                    status.innerText = "Klausur wurde gestartet";
                    getBody();
                } else {
                    status.innerText = "Klausur noch nicht gestartet"
                }
            })
        updateKlausurstatus()
    },1000)
}

//Get Klausur-Body for students and start the timer
function getBody() {
    const body = document.getElementById("klausurbody");


    fetch('/api/klausur/getBody', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(body.innerHTML.trim().length===0){
                for (let prop in data) {
                    body.innerHTML += data[prop];
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


updateKlausurstatus();

