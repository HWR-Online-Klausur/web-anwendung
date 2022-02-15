// Fetch-Funktion für die Klausur-Uploading
const jsonKlausurForm = document.getElementById('jsonKlausurForm');

jsonKlausurForm.addEventListener('submit', function (e) {
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
                history.replaceState(null, null, "?" + queryParams.toString());

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


zeitKlausurForm.addEventListener('submit', function (e) {
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

function toggleKlausurEinstellungen() {
    const toggleKlausurEinstellungenButton = document.getElementById("toggleKlausurEinstellungenButton");
    const divKlausurEinstellungeg = document.getElementById("divKlausurEinstellungeg");
    if (divKlausurEinstellungeg.hidden) {
        divKlausurEinstellungeg.hidden = false;
        toggleKlausurEinstellungenButton.innerHTML = `Klausur Einstellungen schließen<img src='style/icons/arrow-up-circle-fill.svg'>`
    } else {
        divKlausurEinstellungeg.hidden = true;
        toggleKlausurEinstellungenButton.innerHTML = `Klausur Einstellungen öffnen<img src='style/icons/arrow-down-circle-fill.svg'>`
    }

}

function getUsers() {
    const params = new URLSearchParams(window.location.search);
    const ID = params.get("ID");
    const obj = {'klausurID': ID}
    const tableBody = document.getElementById("tableBody");

        let i = 1;

        tableBody.innerHTML = ``;
        fetch('/api/user/getAllStudents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                for (let key in data) {
                    fetch('/api/klausurData/getKlausurData', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            'klausurID': ID,
                            'matrikelnummer': data[key].matrikelnummer
                        })
                    }).then(res =>{
                        if(res.status === 200){
                            tableBody.innerHTML += `<tr><th scope="row">${i}</th><td>${data[key].name}</td><td>Abgegeben</td><td><button id="${data[key].matrikelnummer}" onclick="download('${data[key].klausurID}', '${data[key].matrikelnummer}', '${data[key].name}')">Herunterladen</button></td></tr>`
                        }else{
                            tableBody.innerHTML += `<tr><th scope="row">${i}</th><td>${data[key].name}</td><td>Nicht Abgegeben</td><td><button id="${data[key].matrikelnummer}" onclick="download('${data[key].klausurID}', '${data[key].matrikelnummer}', '${data[key].name}')" disabled>Herunterladen</button></td></tr>`
                        }
                        i++;
                    })
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

}

download = (klausurID, matrnr, name) => {
    fetch('/api/klausurData/downloadKlausurData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'klausurID': klausurID,
            'matrikelnummer': matrnr
        })
    }).then(async data => {
        if (data.status === 200) {
            return await data.blob()
        }
        else {
            throw 'Failed'
        }
    })
        .then(resObj => {
            const newBlob = new Blob([resObj], { type: 'application/pdf' });

            // MS Edge and IE don't allow using a blob object directly as link href, instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
            } else {
                // For other browsers: create a link pointing to the ObjectURL containing the blob.
                const objUrl = window.URL.createObjectURL(newBlob);

                let link = document.createElement('a');
                link.href = objUrl;
                link.download = name + '.pdf';
                link.click();

                // For Firefox it is necessary to delay revoking the ObjectURL.
                setTimeout(() => { window.URL.revokeObjectURL(objUrl); }, 250);
            }
        })
        .catch(e => console.error(e))
}



function goToDashboard(){
    location.replace("/dashboard.html")

}

document.addEventListener('DOMContentLoaded', function() {
    let params = new URLSearchParams(document.location.search);
    let ID = params.get("ID");
    document.getElementById('klausurID').innerText = "Klausur ID: " + ID;
}, false);
