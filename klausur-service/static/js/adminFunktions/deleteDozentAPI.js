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
