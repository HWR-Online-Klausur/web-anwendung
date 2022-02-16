
function toggleAddNewDozentDiv() {
    const divloginForm = document.getElementById("divloginForm");
    if (divloginForm.hidden) {
        divloginForm.hidden = false;
    } else {
        divloginForm.hidden = true;
    }
}




function goToDashboard(){
    location.href = "/dashboard.html";
}
