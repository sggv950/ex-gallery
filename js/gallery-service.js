'use strict';

var gProjs = [
    { "id": "minesweeper", "name": "Minesweeper", "title": "Don't Step on the mines", "desc": "lorem ipsum lorem ipsum lorem ipsum", "url": "projs/minesweeper/index.html", "publishedAt": 1448693940000, "labels": ["Matrixes", "click events"] },
    { "id": "guessWho", "name": "Guess Who?", "title": "Know who you think of...", "desc": "lorem ipsum lorem ipsum lorem ipsum", "url": "projs/guesswho/index.html", "publishedAt": 1448693940000, "labels": ["BootStarp", "jQuery", "learning", "click events"] },
    { "id": "bookStore", "name": "Book store", "title": "Simple book store", "desc": "lorem ipsum lorem ipsum lorem ipsum", "url": "projs/bookstore/index.html", "publishedAt": 1448693940000, "labels": ["BootStarp", "jQuery", "click events"] },
    { "id": "todoList", "name": "ToDo List", "title": "What to do next?", "desc": "lorem ipsum lorem ipsum lorem ipsum", "url": "projs/todolist/index.html", "publishedAt": 1448693940000, "labels": ["click events"] }
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