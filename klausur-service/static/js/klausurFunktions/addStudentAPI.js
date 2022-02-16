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
