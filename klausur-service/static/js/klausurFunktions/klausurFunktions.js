//Change input Student Data

const SwitchCheckNameNummer = document.getElementById("SwitchCheckNameNummer");

SwitchCheckNameNummer.addEventListener('change', updateDataStatus);

function updateDataStatus() {
    const status = document.getElementById("studentDataStatus");
    const inputName = document.getElementById("studentenNameInput");
    const inputNummer = document.getElementById("studentenMatrikelnummerInput");

    if (this.checked) {
        inputName.setAttribute("disabled", "true");
        inputNummer.setAttribute("disabled", "true");

        fetch('/api/user/addStudent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: inputName.value, matrikelnummer: inputNummer.value})
        })
            .then(response => {
            if(response.status===200){
                status.innerHTML = `<div class="alert alert-success" role="alert">Angabe wurde gespeichert!</div>`;
            }else{
                status.innerHTML = `<div class="alert alert-danger" role="alert">Beim Speichern Ihrer Angabe ist ein Problem aufgetreten!</div>`;
            }
        })
            .catch(error => {
                console.error('Error:', error);
            });


    } else {
        deleteUser();

        inputName.removeAttribute("disabled");
        inputNummer.removeAttribute("disabled");
    }



}


//Change Klausurstatus

function updateKlausurstatus(){
    setTimeout(()=> {

        fetch("/api/klausur/klausurStatus")
            .then(res => {
                return res.json();
            })
            .then(data => {
                const status = document.getElementById("klausurstatus")
                if (data.klausurStatus) {
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
                body.innerHTML += `<button type="button" onclick="saveKlausurData()">Abgeben</button>`
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


updateKlausurstatus();

//if we close or reload the tab - user will be deleted
const beforeUnloadListener = (event) => {
    deleteUser();
    event.preventDefault();
    return event.returnValue = "Are you sure you want to exit?";
};

addEventListener("beforeunload", beforeUnloadListener, {capture: true});

//TODO: make it for all inputs
/*
const input = document.querySelectorAll("input");
for (let elem of input) {
    console.log(elem.value)
}
input.addEventListener("input", (event) => {
    if (event.target.value !== "") {
        addEventListener("beforeunload", beforeUnloadListener, {capture: true});
    } else {
        removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
    }
});
 */



//deleteStudent function use
function deleteUser(){
    const status = document.getElementById("studentDataStatus");
    const inputName = document.getElementById("studentenNameInput");
    const inputNummer = document.getElementById("studentenMatrikelnummerInput");
    fetch('/api/user/deleteStudent', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: inputName.value, matrikelnummer: inputNummer.value})
    })
        .then(response => {
            if(response.status===200){
                status.innerHTML = `<div class="alert alert-success" role="alert">Angabe wurde gelöscht!</div>`;
            }else{
                status.innerHTML = `<div class="alert alert-danger" role="alert">Beim Löschen Ihrer Angabe ist ein Problem aufgetreten!</div>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function saveKlausurData(){
    const klausurBodyForm = document.getElementById('klausurBodyForm');
    let formData = new FormData(klausurBodyForm);
    fetch('/api/klausurData/saveKlausurData',{
        method: 'POST',
        headers: {
            'enctype' : 'multipart/form-data'
        },
        body: formData
    })
        .then(response => {
            if(response.status === 200){
                //TODO: Change it!
                alert('Yep!');
            }else{
                alert('Ooops...');
            }
        })
}
