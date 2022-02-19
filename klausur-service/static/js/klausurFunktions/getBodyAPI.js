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
