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
