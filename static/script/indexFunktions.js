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
                    status.innerText = "Klausur wurde gestartet"
                } else {
                    status.innerText = "Klausur noch nicht gestartet"
                }
            })
        updateKlausurstatus()
    },1000)
}

updateKlausurstatus();
