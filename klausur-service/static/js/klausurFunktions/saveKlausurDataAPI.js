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
                //TODO: Change it!
                alert('Yep!');
            }else{
                alert('Ooops...');
            }
        })
}
