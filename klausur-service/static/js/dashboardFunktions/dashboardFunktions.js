document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ``;

    fetch('/api/klausur/getAllKlausuren', {
        method: 'POST'
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            for (let key in data) {
                let status = data[key].finished;
                switch (status) {
                    case true:
                        status = "Erledigt";
                        break;
                    case false:
                        status = "Gestartet";
                        break;
                    default:
                        status = "Nicht definiert";
                        break;
                }
                tableBody.innerHTML += `<tr><th scope="row">${data[key].titel}</th><td>${data[key]._id}</td><td>${status}</td><td><button id="${data[key].matrikelnummer}" onclick="goToDashboardKlausurID('${data[key]._id}')">Anshauen</button></td></tr>`
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}, false);



document.querySelector("#tableBody > tr:nth-child(1)")

function goToDashboardKlausurID(param) {
    // Construct URLSearchParams object instance from current URL querystring.
    let params = new URLSearchParams(window.location.search);
    // Set new or modify existing parameter value.
    params.set("ID", param);
    location.replace("/dashboardKlausur.html?"+params.toString())
}

function createNewKlausur(){
    location.replace("/dashboardKlausur.html")
}

function goToAdminPanel(){
    location.replace("/admin.html")
}
