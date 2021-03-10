
// Fetch-Funktion für die Klausur-Uploading
const jsonKlausurForm = document.getElementById('jsonKlausurForm');

jsonKlausurForm.addEventListener('submit',function (e){
    e.preventDefault();

    const input = document.getElementById('jsonKlausur');
    const formData = new FormData();
    formData.append('jsonKlausur', input.files[0]);

    fetch('/api/jsonRead', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if(response.status===200){
                input.value = "";
                document.getElementById('status').innerText="Sie haben die JSON Datei erfolgreich abgeschickt!"
            }else{
                document.getElementById('status').innerText="Beim senden der JSON Datei ist ein Problem aufgetreten!"
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

    fetch('/api/klausurStarten', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(obj)
    })
        .then(response => {
            if(response.status===200){
                console.log("Niice");
            }else{
                console.log("Not nice");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
})
