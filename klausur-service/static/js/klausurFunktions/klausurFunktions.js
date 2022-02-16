//if we close or reload the tab - user will be deleted
const beforeUnloadListener = (event) => {
    deleteUser();
    event.preventDefault();
    return event.returnValue = "Are you sure you want to exit?";
};

addEventListener("beforeunload", beforeUnloadListener, {capture: true});

//TODO: make it for all inputs
/*
const input = document.querySelectorAll("input");
for (let elem of input) {
    console.log(elem.value)
}
input.addEventListener("input", (event) => {
    if (event.target.value !== "") {
        addEventListener("beforeunload", beforeUnloadListener, {capture: true});
    } else {
        removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
    }
});
 */

