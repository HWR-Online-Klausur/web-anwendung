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
