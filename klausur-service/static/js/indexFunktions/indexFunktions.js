
const KlausurIDForm = document.getElementById('KlausurIDForm');

KlausurIDForm.addEventListener('submit',function (e){
    e.preventDefault();

    const klausurID = document.getElementById("KlausurIDInput");
    const status = document.getElementById("KlausurIDDataStatus");

    fetch('/api/user/addStudentKlausurID', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({klausurID: klausurID.value})
    })
        .then(response => {
            if(response.status===200){
                location.replace("/klausur.html")
            }else{
                status.innerHTML = `<div class="alert alert-danger" role="alert">Ihre ID wurde nicht gefunden!</div>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
})
