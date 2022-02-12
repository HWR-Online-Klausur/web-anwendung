
// Fetch-Funktion für die Klausur-Uploading
const jsonKlausurForm = document.getElementById('jsonKlausurForm');

jsonKlausurForm.addEventListener('submit',function (e){
    e.preventDefault();

    const input = document.getElementById('jsonKlausur');
    const formData = new FormData();
    formData.append('jsonKlausur', input.files[0]);

    fetch('/api/klausur/upload', {
        method: 'POST',
        body: formData
    })
        .then(async data => {
            if (data.status === 200) {
                const kID = await data.json();
                input.value = "";
                document.getElementById('status').innerText = "Sie haben die JSON Datei erfolgreich abgeschickt!"
                document.getElementById('klausurID').innerText = "Klausur ID: " + kID.klausurID;
                // Construct URLSearchParams object instance from current URL querystring.
                let queryParams = new URLSearchParams(window.location.search);
                // Set new or modify existing parameter value.
                queryParams.set("ID", kID.klausurID);
                history.replaceState(null, null, "?"+queryParams.toString());

            } else {
                document.getElementById('status').innerText = "Beim senden der JSON Datei ist ein Problem aufgetreten!"
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
})


// Fetch-Funktion für die Zeit-Klausur
const zeitKlausurForm = document.getElementById('zeitKlausurForm');


zeitKlausurForm.addEventListener('submit',function (e){
    e.preventDefault();

    const stunden = document.getElementById("stunden").value;
    const minuten = document.getElementById("minuten").value;
    const obj = {stunden: stunden, minuten: minuten};

    fetch('/api/klausur/setTime', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(obj)
    })
        .catch(error => {
            console.error('Error:', error);
        });
})

//Klausur-Einstellungen Schließen/Öffnen

function toggleKlausurEinstellungen(){
    const toggleKlausurEinstellungenButton = document.getElementById("toggleKlausurEinstellungenButton");
    const divKlausurEinstellungeg = document.getElementById("divKlausurEinstellungeg");
    if(divKlausurEinstellungeg.hidden){
        divKlausurEinstellungeg.hidden = false;
        toggleKlausurEinstellungenButton.innerHTML = `Klausur Einstellungen schließen<img src='style/icons/arrow-up-circle-fill.svg'>`
    }else{
        divKlausurEinstellungeg.hidden = true;
        toggleKlausurEinstellungenButton.innerHTML = `Klausur Einstellungen öffnen<img src='style/icons/arrow-down-circle-fill.svg'>`
    }

}

function getUsers(){
    const params = new URLSearchParams(window.location.search);
    const obj = {'klausurID':params.get("ID")}
    const tableBody = document.getElementById("tableBody");


    setTimeout(()=> {


        let i = 1;

        tableBody.innerHTML = ``;
        fetch('/api/data/getAllStudents', {
            method: 'POST',
            body: JSON.stringify(obj)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                for (let key in data) {
                    tableBody.innerHTML += `<tr><th scope="row">${i}</th><td>${data[key].name}</td><td><button>Herunterladen</button></td></tr>`
                    i++;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

        getUsers()
    },5000)
}

getUsers();
