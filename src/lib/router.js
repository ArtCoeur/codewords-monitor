var Board = require('./board');

var boards = {};

/**
 * Handle all facts
 *
 * @param pub socket to publish facts to
 * @param fact a fact object received from the subscribed socket
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
        pub.write(JSON.stringify({
            board: fact.board,
            name: 'board.solved',
            data : {
                body: {
                    duration: boards[fact.board].duration()
                },
                type: "application/json"
            }
        }));
    } else {
        // publish other facts or log info?
    }

};