var Board = require('./board');

var boards = {};

/**
 * Handle all facts
 *
 * @param fact
 */
module.exports.newFact = function(pub, fact) {

    switch (fact.name){
        case 'board.new':
            boards[fact.board] = new Board(fact.board);
            break;

        case 'word.new':
            boards[fact.board].addWord(fact.data.body);
            break;

        case 'cell.updated':
            boards[fact.board].letterSolved(fact.data.body.number, fact.data.body.letter);
            break;
        default :
            //

    }
    // test if the board is solved
    if (boards[fact.board].isSolved()){
        pub.write();
    }

};