document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ``;

    fetch('/api/user/getAllDozents', {
        method: 'GET'
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            for (let key in data) {
                tableBody.innerHTML += `<tr><th scope="row">${data[key].name}</th><td>${data[key].mail}</td><td><button id="${data[key].matrikelnummer}" onclick="deleteDozent('${data[key].mail}')">Delete</button></td></tr>`
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}, false);

function deleteDozent(mail){
    fetch('/api/user/deleteDozent', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({mail: mail})
    })
        .then(response => {
            if(response.status===200){
                location.reload();
            }else{
                alert("Etwas ist schief gelaufen");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

}


function toggleAddNewDozentDiv() {
    const divloginForm = document.getElementById("divloginForm");
    if (divloginForm.hidden) {
        divloginForm.hidden = false;
    } else {
        divloginForm.hidden = true;
    }
}


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

function goToDashboard(){
    location.replace("/dashboard.html")

}
