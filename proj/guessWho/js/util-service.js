function capitalizeFirstLetter(string) {
    if (string[string.length - 1] === '?') return string.charAt(0).toUpperCase() + string.slice(1);
    return string.charAt(0).toUpperCase() + string.slice(1) + "?";
};

function saveTreeToLocalStorage() {
    localStorage.gQuestsTree = JSON.stringify(localStorage.gQuestsTree);
};

function getTreeFromLocalStorage() {
    if (localStorage.gQuestsTree) {
        return JSON.parse(localStorage.gQuestsTree)
    } else {
        return false;
    }
}