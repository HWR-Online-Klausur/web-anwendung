
function goToDashboardKlausurID(param) {
    // Construct URLSearchParams object instance from current URL querystring.
    let params = new URLSearchParams(window.location.search);
    // Set new or modify existing parameter value.
    params.set("ID", param);
    location.href = "/dashboardKlausur.html?"+params.toString();
}

function createNewKlausur(){
    location.href = "/dashboardKlausur.html";
}

function goToAdminPanel(){
    location.href = "/admin.html";
}
