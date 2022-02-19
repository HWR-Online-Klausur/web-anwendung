const CreateDataForm = document.getElementById('CreateDataForm');

CreateDataForm.addEventListener('submit',function (e){
    e.preventDefault();

    const dozentMail = document.getElementById("dozentMailInput");
    const dozentPassword = document.getElementById("dozentPasswordInput");
    const dozentName = document.getElementById("dozentNameInput");
    const status = document.getElementById("CreateStatus");


    fetch('/api/user/addDozent', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({mail: dozentMail.value,name: dozentName.value, password: dozentPassword.value})
    })
        .then(response => {
            if(response.status===200){
                location.reload();
            }else{
                status.innerHTML = `<div class="alert alert-danger" role="alert">Dozent ist bereits vorhanden!</div>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
})
