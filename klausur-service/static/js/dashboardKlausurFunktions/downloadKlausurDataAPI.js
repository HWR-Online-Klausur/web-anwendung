download = (klausurID, matrnr, name) => {
    fetch('/api/klausurData/downloadKlausurData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'klausurID': klausurID,
            'matrikelnummer': matrnr
        })
    }).then(async data => {
        if (data.status === 200) {
            return await data.blob()
        }
        else {
            throw 'Failed'
        }
    })
        .then(resObj => {
            const newBlob = new Blob([resObj], { type: 'application/pdf' });

            // MS Edge and IE don't allow using a blob object directly as link href, instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
            } else {
                // For other browsers: create a link pointing to the ObjectURL containing the blob.
                const objUrl = window.URL.createObjectURL(newBlob);

                let link = document.createElement('a');
                link.href = objUrl;
                link.download = name + '.pdf';
                link.click();

                // For Firefox it is necessary to delay revoking the ObjectURL.
                setTimeout(() => { window.URL.revokeObjectURL(objUrl); }, 250);
            }
        })
        .catch(e => console.error(e))
}
