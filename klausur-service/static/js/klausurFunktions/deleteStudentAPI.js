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
