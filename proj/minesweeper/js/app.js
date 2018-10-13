console.log('running');
var MINE = '💣';
var FLAG = '🚩';
var EMPTY = '';
var BOOM = '🔥';
var WRONG_FLAG = '⚑';
var SMILE = '😅';
var WIN_ICON = '🤠';
var LOSE_ICON = '😬';

var gLevel;
var gBoard;
var gState;
var gTimerInterval;
var gBestScore;

// CR: You can do it much simpler:
// CR: Passing an argument from the DOM and using gLevel object with size and mines.
function setGameDifficulty() {
    var tempObj = {};
    var elDiffInput = document.querySelectorAll('.difficulty input');
    // CR: When you find the checked radio button in the loop, why keep running in it?
    // CR: You can break the loop.
    for (var i = 0; i < elDiffInput.length; i++) {
        if (elDiffInput[i].checked) {
            tempObj.SIZE = +elDiffInput[i].dataset.size;
            tempObj.MINES = +elDiffInput[i].dataset.mines;
            tempObj.NAME = elDiffInput[i].classList[0];
            break;
        }
    }
    return tempObj
}
function init() {
    clearInterval(gTimerInterval);
    gLevel = setGameDifficulty();
    gState = { isGameOn: true, shownCount: 0, markedCount: gLevel.MINES, timePassed: 0};
    gBoard = buildInitialBoard(gLevel.SIZE);
    showBestScore();
    console.table(gBoard);
    renderFlagsCount();
    renderTimer();
    renderBoard(gBoard);
    // CR: You use a func to render the flags count and timer.
    // CR: Why won't use a func to render the smiley and avoid 3 times querySelector for it?
    document.querySelector('.face button').innerHTML = SMILE;
}

//build the model matrix
// CR: Why capital?
function buildInitialBoard(SIZE) {
    var matSize = SIZE;
    var board = [];
    for (var i = 0; i < matSize; i++) {
        board[i] = [];
        for (var j = 0; j < matSize; j++) {
            // CR: I think the 'canBeMine' method is causing you a lot of bugs.
            board[i].push({ mineAroundCount: 0, isShown: false, isMine: false, isCount: false, isMarked: false, canBeMine: true })
        }
    }
    return board
}

//render the initial board to the page
function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cellVal = gBoard[i][j].mineAroundCount;
            var className;
            if (cellVal === 0) cellVal = EMPTY;
            if (board[i][j].isShown) className = `cell cell-${i}-${j}`;
            else className = `cell cell-${i}-${j} hide`;
            strHtml += `<td class="${className}" onmouseup="cellClicked(event, this)" oncontextmenu="event.preventDefault();"
            >${cellVal}</td>`;
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.board');
    elMat.innerHTML = strHtml;
}

//count negibors with mines
function minesNegCount(cellI, cellJ, mat) {
    var minesAround = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine) minesAround++;
        }
    }
    return minesAround;
}

//apply numbers to the cells
function calcMinesForAllCells(board) {
    var board = board;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j].mineAroundCount = minesNegCount(i, j, board);
        }
    }
    // CR: return the board to where?
    // CR: in cellClicked() you just call this func
    // CR: without assign it to any variable.
    return board;
}


// CR: This is a bad func that often stuck the browser with an error:
// CR: 'Maximum call stack size exceeded'.
// CR: Try: first click on cell 1-1 in any level and see the console.
// CR: There are much better practices to choose a random cell
// CR: and NOT use recursion func.
function placeMines(board, mines, prob) {
    // debugger;
    // CR: if you get 'prob' as argument, why use mineProb? 
    // CR: just write 'placeMines(board, mines, mineProb) {'
    var mineProb = prob;
    var tempMines = mines;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!tempMines) return;
            if (board[i][j].isMine) continue;
            if (board[i][j].canBeMine && Math.random() < mineProb) {
                board[i][j].isMine = true;
                tempMines--
            }
        }
    }
    if (tempMines) placeMines(gBoard, tempMines, mineProb + 0.1);
}


function initialCellClick(cellI, cellJ, mat) {
    // debugger;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            gBoard[i][j].canBeMine = false;
        }
    }
    console.table(gBoard);
}
function checkIfNegEmpty(cellI, cellJ, mat) {
    // debugger;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;

            if (mat[i][j].mineAroundCount === 0 && !mat[i][j].isShown) {
                mat[i][j].isShown = true;
                mat[i][j].isCount = true;
                gState.shownCount++;
                checkIfNegEmpty(i, j, mat);
            }
            if (mat[i][j].mineAroundCount > 0 && !mat[i][j].isShown) {
                mat[i][j].isShown = true;
                mat[i][j].isCount = true;
                gState.shownCount++;
            }
        }
    }
    // CR: Unnecessary return.
    return;
}

// CR: This is a very long func that does a lot of things.
// CR: Consider break it up into 3 funcs:
// CR: cellClicked, handleLeftClick, handleRightClick
// when cell is clicked
function cellClicked(event, elCell) {
    if (gState.isGameOn) {
        console.log(elCell)
        var elCellClass = '.' + elCell.classList[1];
        var btnClicked = event.which;
        var idxI = +elCellClass.split('-')[1];
        var idxJ = +elCellClass.split('-')[2];
        // CR: Better name: currCell
        var cell = gBoard[idxI][idxJ];

        if (btnClicked === 1) {

            if (cell.isMarked) return;
            if (gState.shownCount === 0) {
                gTimerInterval = setInterval(function () {
                    gState.timePassed++;
                    renderTimer();
                }, 1000)
                // debugger;
                gBoard[idxI][idxJ].isMine = false;
                gBoard[idxI][idxJ].canBeMine = false;
                gBoard[idxI][idxJ].isCount = true;
                initialCellClick(idxI, idxJ, gBoard);
                placeMines(gBoard, gLevel.MINES, 0.1);
                calcMinesForAllCells(gBoard);
                checkIfNegEmpty(idxI, idxJ, gBoard);
                renderBoard(gBoard);
            }
            if (cell.isMine) {
                //update the DOM
                revealBoard();
                // CR: You already removed it in 'revealBoard()'.
                elCell.classList.remove('hide');
                renderCell(idxI, idxJ, BOOM);

                return loseGame();

            } else if (cell.mineAroundCount > 0) {
                //update the model
                cell.isShown = true;
                cell.isCount = true;
                gState.shownCount++;
                //update the DOM
                elCell.classList.remove('hide');
                renderCell(idxI, idxJ, cell.mineAroundCount);

                if (checkWin()) return winGame();

            } else {
                //update the model
                checkIfNegEmpty(idxI, idxJ, gBoard);
                cell.isShown = true;
                cell.isCount = true;
                //update the DOM
                renderBoard(gBoard);

                if (checkWin()) return winGame();
            }
        } else if (btnClicked === 3) {

            if (gState.shownCount === 0) return;
            if (cell.isShown) return;
            if (!cell.isMarked) {
                //update the model
                cell.isMarked = true;
                gState.markedCount--;
                //update the DOM
                renderCell(idxI, idxJ, FLAG);
                renderFlagsCount();

                if (checkWin()) return winGame();

            } else {
                //update the model
                cell.isMarked = false;
                gState.markedCount++;
                //update the DOM
                renderCell(idxI, idxJ, EMPTY);
                renderFlagsCount();

                if (checkWin()) return winGame();
            }
        } else {
            return;
        }
    } else {
        return;
    }
}

//render the cell to the board
function renderCell(i, j, value) {
    // CR: Unnecessary variable. You can use the 'value' in arguments.
    var tempValue = value;
    if (value === 0) tempValue = EMPTY;
    var cellSelector = getClassName(i, j)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = tempValue;
}
//render the flags count to the board
function renderFlagsCount() {
    var elFlagsDiv = document.querySelector('.flags-count span');
    elFlagsDiv.innerHTML = gState.markedCount;
}

function renderTimer() {
    var elTimerDiv = document.querySelector('.timer span');
    elTimerDiv.innerHTML = gState.timePassed;
}

// Returns the class name for a specific cell
function getClassName(i, j) {
    var cellClass = '.cell-' + i + '-' + j;
    return cellClass;
}

//reveal the board after the game ends
function revealBoard() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cellClass = getClassName(i, j);
            // CR: If the first 'if' is true, the others must be false.
            // CR: So no need to evaluate all. Use 'else if' statement. 
            if (gBoard[i][j].isMarked && gBoard[i][j].isMine) {
                continue;
            }
            // CR: Nice!
            if (gBoard[i][j].isMarked && !gBoard[i][j].isMine) {
                document.querySelector(cellClass).classList.remove('hide');
                document.querySelector(cellClass).classList.add('wrong');
                renderCell(i, j, WRONG_FLAG);
            }
            if (gBoard[i][j].isMine) {
                document.querySelector(cellClass).classList.remove('hide');
                renderCell(i, j, MINE);
            }

        }
    }
}

function loseGame() {
    clearInterval(gTimerInterval);
    gState.isGameOn = false;
    document.querySelector('.face button').innerHTML = LOSE_ICON;
}

function winGame() {
    clearInterval(gTimerInterval);
    var tempScoreLevel = gLevel.NAME;
    var tempScore = gState.timePassed;
    if (localStorage.getItem(tempScoreLevel)) {
        // CR: Doesn't work as expected. The best score is always the 1st play. 
        if (+(localStorage.getItem(tempScoreLevel)) <= tempScore) localStorage.setItem(tempScoreLevel, tempScore);
    } else {
        localStorage.setItem(tempScoreLevel, tempScore);
    }
    showBestScore();
    // CR: Are you clearing the timer AFTER you set it in local storage?
    document.querySelector('.face button').innerHTML = WIN_ICON;
    gState.isGameOn = false;
}

function checkWin() {
    return gLevel.SIZE ** 2 - gLevel.MINES === gState.shownCount && gState.markedCount === 0;
}


// CR: You can do it much simpler. You have gLevel or gState for example.
function showBestScore() {
    gLevel = setGameDifficulty();
    var tempScoreLevel = gLevel.NAME;
    var tempScore = localStorage.getItem(tempScoreLevel) ? localStorage.getItem(tempScoreLevel) + ' sec' : '--';
    
    // // CR: When you find the checked radio button in the loop, why keep running in it?
    // // CR: You can break the loop.
    // for (var i = 0; i < elDiffInput.length; i++) {
    //     if (elDiffInput[i].checked) {
    //         tempScoreLevel = elDiffInput[i].classList[0];
    //         break;
    //         // CR: nice use of short if.
    //         tempScore = localStorage.getItem(tempScoreLevel) ? localStorage.getItem(tempScoreLevel) + ' sec' : '--';
    //     }
    // }
    document.querySelector('.level').innerHTML = tempScoreLevel;
    document.querySelector('.score').innerHTML = tempScore;
}