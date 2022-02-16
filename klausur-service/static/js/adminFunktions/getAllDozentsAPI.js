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
