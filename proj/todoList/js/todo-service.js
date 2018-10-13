'use strict'
const KEY_TODOS = 'todos';

var gTodos;
var gTodosFilter = 'all';
var gImportance = 1;
var gTodoSort = 'txt';

function createTodos() {
    var todos = getFromStorage(KEY_TODOS);
    gTodos = (todos) ? todos : [createTodo('Learn HTML'), createTodo('Practice CSS')]
}
function createTodo(txt) {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        createdAt: createTimestamp(),
        importance: gImportance
    }
}

function getTodos() {
    var gTodoFiltered = gTodos.filter(function (todo) {
        return gTodosFilter === 'all' ||
            (gTodosFilter === 'done' && todo.isDone) ||
            (gTodosFilter === 'active' && !todo.isDone)
    });
    var gTodoSorted;
    if (gTodoSort === 'txt') gTodoSorted = gTodoFiltered.sort(function (a, b) {
        if (a.txt.toLowerCase() < b.txt.toLowerCase()) return -1;
        if (b.txt.toLowerCase() < a.txt.toLowerCase()) return 1;
        return 0;
    });
    if (gTodoSort === 'createdAt') gTodoSorted = gTodoFiltered.sort(function (a, b) { return b.createdAt - a.createdAt });
    if (gTodoSort === 'importance') gTodoSorted = gTodoFiltered.sort(function (a, b) { return b.importance - a.importance });
    return gTodoSorted;
}


function addTodo(todoTxt) {
    gTodos.unshift(createTodo(todoTxt));
    saveToStorage(KEY_TODOS, gTodos);

}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    });
    todo.isDone = !todo.isDone;
    saveToStorage(KEY_TODOS, gTodos);
}

function setFilter(statusFilter) {
    gTodosFilter = statusFilter;
}

function setSort(statusSort) {
    gTodoSort = statusSort;
}

function setImportance(importanceLvl) {
    gImportance = +importanceLvl;
}

function deleteTodo(todoId) {
    var todoIdx = gTodos.findIndex(function (todo) {
        return todo.id === todoId;
    })
    gTodos.splice(todoIdx, 1);
    saveToStorage(KEY_TODOS, gTodos);
}

function getTodoCount() {
    return gTodos.length;
}
function getActiveCount() {
    return gTodos.filter(function (todo) {
        return !todo.isDone
    }).length
}

