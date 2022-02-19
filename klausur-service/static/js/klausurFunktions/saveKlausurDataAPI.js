function saveKlausurData(){
    const klausurBodyForm = document.getElementById('klausurBodyForm');
    let formData = new FormData(klausurBodyForm);
    fetch('/api/klausurData/saveKlausurData',{
        method: 'POST',
        headers: {
            'enctype' : 'multipart/form-data'
        },
        body: formData
    })
        .then(response => {
            if(response.status === 200){
                alert('Klausur wurde erfolgreich gespeichert!');
            }else{
                alert('Beim Speichern ist ein Fehler aufgetreten!');
            }
        })
}
