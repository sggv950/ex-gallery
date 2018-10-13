'use strict';

var gBooks;

function createBooks() {
    gBooks = [
        { id: makeId(), name: 'Candy is magic', price: '20.00', imgUrl: 'lib/img/1.jpg', rate: 0 },
        { id: makeId(), name: 'Six seasones', price: '30.00', imgUrl: 'lib/img/2.jpg', rate: 0 },
        { id: makeId(), name: 'Fantastic beasts', price: '40.00', imgUrl: 'lib/img/3.jpg', rate: 0 },
        { id: makeId(), name: 'Champagne', price: '10.00', imgUrl: 'lib/img/4.jpg', rate: 0 },
        { id: makeId(), name: 'Were all wonders', price: '20.00', imgUrl: 'lib/img/5.jpg', rate: 0 }
    ];
}

function createBook(name, price) {
    return {
        id: makeId(),
        name: name,
        price: price,
        imgUrl: `lib/img/${Math.floor(Math.random() * 5) + 1}.jpg`,
        rate: 0
    }
}

function getBooks() {
    return gBooks;
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id;
    })
    return book;
}

function deleteBook(bookId) {
    var fliterdBooks = gBooks.filter(function (book) {
        return book.id !== bookId;
    });
    gBooks = fliterdBooks;
}

function addBook(name, price) {
    var book = createBook(name, price);
    gBooks.push(book);
}

function updateBook(bookId, newBookPrice) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id;
    })
    gBooks[bookIdx].price = newBookPrice;
}

function updateBookRateUp(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id;
    })
    gBooks[bookIdx].rate++;
}

function updateBookRateDown(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id;
    })
    gBooks[bookIdx].rate--;
}