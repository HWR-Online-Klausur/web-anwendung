
const LoginDataForm = document.getElementById('LoginDataForm');

LoginDataForm.addEventListener('submit',function (e){
    e.preventDefault();

    const dozentMail = document.getElementById("dozentMailInput");
    const dozentPassword = document.getElementById("dozentPasswordInput");
    const status = document.getElementById("LoginStatus");


    fetch('/api/user/loginDozent', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({mail: dozentMail.value, password: dozentPassword.value})
    })
        .then(response => {
            if(response.status===200){
                location.replace("/dashboard.html")
            }else{
                status.innerHTML = `<div class="alert alert-danger" role="alert">Mail oder Password sind falsh!</div>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

function lol (){
    console.log("123");
}
