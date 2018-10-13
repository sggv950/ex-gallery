'use strict'

// This is our controller it is responsible for rendering the view and action upon events
console.log('Todo');

function init() {
    createTodos();
    render();
}

function render() {
    renderTodos();
    renderStats();
}


function renderTodos() {
    var todos = getTodos();
    if (todos.length > 0) {
        var strHtmls = todos.map(function (todo) {
            var importance;
            if(todo.importance === 1) importance = 'forgetable';
            if(todo.importance === 2) importance = 'important';
            if(todo.importance === 3) importance = 'very-important';
            return `<li class="${(todo.isDone) ? 'done' : ''} ${importance}" onclick="onTodoClicked('${todo.id}')">
                   ${todo.txt}
                   <button class="btn-delete" onclick="onDeleteTodo('${todo.id}', event)">
                      &times;
                    </button>
                </li>`;
        })
        document.querySelector('.todo-list').innerHTML = strHtmls.join('')
    } else {
        if (gTodosFilter === 'all') document.querySelector('.todo-list').innerHTML = `<h2>No ToDo's</h2>`;
        if (gTodosFilter === 'active') document.querySelector('.todo-list').innerHTML = `<h2>No Active ToDo's</h2>`;
        if (gTodosFilter === 'done') document.querySelector('.todo-list').innerHTML = `<h2>No Done ToDo's</h2>`;
    }
}

function renderStats() {
    document.querySelector('.todo-count').innerHTML = getTodoCount();
    document.querySelector('.active-count').innerHTML = getActiveCount();
}

function onTodoClicked(todoId) {
    toggleTodo(todoId);
    render();
}

function onSetFilter(statusFilter) {
    setFilter(statusFilter);
    render();
}

function onSetSort(statusSort) {
    setSort(statusSort);
    render();
}

function onSetImportance(importanceLvl) {
    setImportance(importanceLvl);
}

function onAddTodo() {
    var elNewTodoTxt = document.querySelector('#newTodoTxt');
    var newTodoTxt = elNewTodoTxt.value;
    if (!newTodoTxt) return;
    addTodo(newTodoTxt);

    document.querySelector('h4').classList.add('animated', 'tada');
    setTimeout(function () {
        document.querySelector('h4').classList.remove('animated', 'tada');
    }, 1000)

    elNewTodoTxt.value = '';
    render()
}

function onDeleteTodo(todoId, ev) {
    // Stop the propegation of the click event so the LI onclick will not trigger
    ev.stopPropagation();
    var confirmation = confirm('Are you sure you want to delete this ToDo?');
    if (confirmation) {
        deleteTodo(todoId);
        render();
    } else {
        return;
    }
}