//Change Klausurstatus

function updateKlausurstatus(){
    setTimeout(()=> {

        fetch("/api/klausur/klausurStatus")
            .then(res => {
                return res.json();
            })
            .then(data => {
                const status = document.getElementById("klausurstatus")
                if (data.klausurStatus) {
                    status.innerText = "Klausur wurde gestartet";
                    getBody();
                } else {
                    status.innerText = "Klausur noch nicht gestartet"
                }
            })
        updateKlausurstatus()
    },1000)
}

updateKlausurstatus();
