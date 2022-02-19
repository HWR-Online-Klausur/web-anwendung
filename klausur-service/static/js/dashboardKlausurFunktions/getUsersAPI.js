function getUsers() {
    const params = new URLSearchParams(window.location.search);
    const ID = params.get("ID");
    const obj = {'klausurID': ID}
    const tableBody = document.getElementById("tableBody");


    let i = 1;

    tableBody.innerHTML = ``;
    fetch('/api/user/getAllStudents', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            let MatrNumCarrier = [];

            for (let key in data) {
                fetch('/api/klausurData/checkIfStudentsPassedKlausur', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'klausurID': ID,
                        'matrikelnummer': data[key].matrikelnummer
                    })
                }).then(res =>{
                    if(res.status === 200){
                        tableBody.innerHTML += `<tr><th scope="row">${i}</th><td>${data[key].name}</td><td>Abgegeben</td><td><button id="${data[key].matrikelnummer}" onclick="download('${data[key].klausurID}', '${data[key].matrikelnummer}', '${data[key].name}')">Herunterladen</button></td></tr>`
                    }else{
                        tableBody.innerHTML += `<tr><th scope="row">${i}</th><td>${data[key].name}</td><td>Nicht Abgegeben</td><td><button id="${data[key].matrikelnummer}" onclick="download('${data[key].klausurID}', '${data[key].matrikelnummer}', '${data[key].name}')" disabled>Herunterladen</button></td></tr>`
                    }
                    i++;
                })

                MatrNumCarrier.push(data[key].matrikelnummer)
            }

            fetch('/api/klausurData/getKlausurData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then(res => {
                    return res.json();
                })
                .then(dataKlausur => {
                    for (let n in dataKlausur){
                        if(MatrNumCarrier.filter(id => id === dataKlausur[n].matrikelnummer).length === 0){
                            tableBody.innerHTML += `<tr><th scope="row">${i}</th><td>${dataKlausur[n].name}</td><td>Abgegeben</td><td><button id="${dataKlausur[n].matrikelnummer}" onclick="download('${dataKlausur[n].klausurID}', '${dataKlausur[n].matrikelnummer}', '${dataKlausur[n].name}')">Herunterladen</button></td></tr>`
                        }
                    }

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
