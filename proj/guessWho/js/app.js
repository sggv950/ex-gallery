'use strict';


$(document).ready(init);

function init() {
    if (localStorage.gQuestsTree) {
        gQuestsTree = getTreeFromLocalStorage();
        gCurrQuest = gQuestsTree;
    } else {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi?');
        gQuestsTree.no = createQuest('Rita?');
        gCurrQuest = gQuestsTree;
    }
}

function startGuessing() {
    // TODO: hide the gameStart section
    $('.gameStart').hide();
    renderQuest();
    // TODO: show the gameQuest section
    $('.gameQuest').show();
}

function renderQuest() {
    // TODO: select the <h2> inside gameQuest and update its text by the currQuest text
    $('.gameQuest h2').html(gCurrQuest.txt);
}

function addGuess() {
    // TODO: create 2 new Quests based on the inputs' values
    // TODO: connect the 2 Quests to the quetsions tree
    var guess = $('#newGuess').val();
    var quest = $('#newQuest').val();
    guess = capitalizeFirstLetter(guess);
    quest = capitalizeFirstLetter(quest);
    var newQuest = createQuest(quest);


    newQuest.yes = createQuest(guess);
    newQuest.no = gCurrQuest;
    gPrevQuest[gLastRes] = newQuest;

    saveTreeToLocalStorage();

    $('#newGuess').val('');
    $('#newQuest').val('');

    restartGame();
}


function restartGame() {
    $('.gameNewQuest').hide();
    $('.gameStart').show();
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}

