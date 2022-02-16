//Klausur-Einstellungen Schließen/Öffnen
function toggleKlausurEinstellungen() {
    const toggleKlausurEinstellungenButton = document.getElementById("toggleKlausurEinstellungenButton");
    const divKlausurEinstellungeg = document.getElementById("divKlausurEinstellungeg");
    if (divKlausurEinstellungeg.hidden) {
        divKlausurEinstellungeg.hidden = false;
        toggleKlausurEinstellungenButton.innerHTML = `Klausur Einstellungen schließen<img src='style/icons/arrow-up-circle-fill.svg'>`
    } else {
        divKlausurEinstellungeg.hidden = true;
        toggleKlausurEinstellungenButton.innerHTML = `Klausur Einstellungen öffnen<img src='style/icons/arrow-down-circle-fill.svg'>`
    }

}

function goToDashboard(){
    location.href = "/dashboard.html";
}

document.addEventListener('DOMContentLoaded', function() {
    let params = new URLSearchParams(document.location.search);
    let ID = params.get("ID");
    document.getElementById('klausurID').innerText = "Klausur ID: " + ID;
}, false);
