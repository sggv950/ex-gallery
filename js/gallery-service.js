'use strict';

var gProjs = [
    { "id": "minesweeper", "name": "Minesweeper", "title": "Don't Step on the mines", "desc": "Minesweeper is an oldy. try to locate and flag all the mines using the numbers in the squares.", "url": "projs/minesweeper/index.html", "publishedAt": 1448693940000, "labels": ["Matrixes", "click events"] },
    { "id": "guessWho", "name": "Guess Who?", "title": "I think I know who you think of...", "desc": "Nice and Quick game which learns from you each round you play", "url": "projs/guesswho/index.html", "publishedAt": 1448693940000, "labels": ["BootStarp", "jQuery", "learning", "click events"] },
    { "id": "bookStore", "name": "Book store", "title": "Simple book store", "desc": "Book store example with features which helps you manage your inventory", "url": "projs/bookstore/index.html", "publishedAt": 1448693940000, "labels": ["BootStarp", "jQuery", "click events"] },
    { "id": "todoList", "name": "ToDo List", "title": "What to do next?", "desc": "Basic web to-do list that helps you remeber the important stuff", "url": "projs/todolist/index.html", "publishedAt": 1448693940000, "labels": ["click events"] }
];

function getProjects(){
    return gProjs;
}

function getProjectById(projId){
    var projectIdx = gProjs.findIndex(function(project){
        return project.id === projId;
    })
    return gProjs[projectIdx];
}

function sendMsg(subject, body) {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=me@example.com&su=${subject}&body=${body}`)
}