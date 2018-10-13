'use strict';


function init() {
    createBooks();
    renderTable();
}

// ${book.name}, ${book.imgUrl}, ${book.rate}

function renderTable() {
    var books = getBooks();
    var carHtmls = books.map(function (book) {
        return `
        <tr>
        <td class="text-center"><img src=${book.imgUrl} width=100 height=133 ></td>
        <td class="text-center">${book.name}</td>
        <td class="text-center">${book.price}$</td>
        <td class="text-center">${book.rate}</td>
        <td align="center"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#read-book-modal" onclick="renderReadModal('${book.id}')">
            Read
        </button></td>
        <td align="center"><button class="btn btn-secondary text-center" onclick="onUpdateBook('${book.id}')">Update</button></td>
        <td align="center"><button class="btn btn-danger text-center" onclick="onDeleteBook('${book.id}')">Delete</button></td>
        </tr>
        `
    })
    $('.table-body').html(carHtmls.join(''))

}

function renderReadModal(bookId) {
    var book = getBookById(bookId);
    var titleHtml = `<span>${book.name}</span>`;
    var strHtml = `
            <img src=${book.imgUrl} width=200 height=266 class="float-right">
            <div class="p-3">
                <h5 class="float-left mb-3">Price: ${book.price}$</h5>
                <h5 class="float-left text-center  mb-3" style="clear:left">Rate: ${book.rate}</h5>
                <div class="float-left align-middle text-center" style="clear:left">
                    <button class="btn btn-info">-</button>
                    <small>change rate</small>
                    <button class="btn btn-info" onclick="onUpdateBookRateUp('${book.id}')">+</button>
                </div>
            </div>
    `
    $('#read-book-modal-title').html(titleHtml);
    $('.read-book-modal-body').html(strHtml);
}


function renderAddBookModal () {}


function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderTable();
}



function onAddBook() {

    var newBookName = $('#new-book-name').val();
    var newBookPrice = $('#new-book-price').val();
    addBook(newBookName, newBookPrice);
    renderTable();
}

function onUpdateBook(bookId) {
    var bookId = bookId;
    var newBookPrice = prompt('new book price?');
    if (!newBookPrice) return;
    updateBook(bookId, newBookPrice);
    renderTable();
}

function onUpdateBookRateUp(bookId) {
    updateBookRateUp(bookId);
    renderReadModal(bookId);
    renderTable();
}

function onUpdateBookRateDown(bookId) {
    updateBookRateDown(bookId);
    renderReadModal(bookId);
    renderTable();
}

$(document).ready(function () { init() });