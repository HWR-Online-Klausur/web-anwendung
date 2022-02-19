//if we close or reload the tab - user will be deleted
const beforeUnloadListener = (event) => {
    deleteUser();
    event.preventDefault();
    return event.returnValue = "Are you sure you want to exit?";
};

addEventListener("beforeunload", beforeUnloadListener, {capture: true});

