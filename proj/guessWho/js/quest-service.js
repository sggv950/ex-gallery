'use strict'

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;


function userResponse(res) {

    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            $('.gameQuest').hide();
            restartGame();
            // TODO: improve UX
        } else {
            alert('I dont know...teach me!');
            // TODO: hide and show gameNewQuest section
            $('.gameQuest').hide();
            $('.gameNewQuest').show();
        }
    } else {
        // TODO: update the prev, curr and res global vars
        console.log(res);
        console.log(gQuestsTree[res]);

        gLastRes = res;
        gPrevQuest = gCurrQuest;
        gCurrQuest = gCurrQuest[gLastRes];

        renderQuest();
    }
}



function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}