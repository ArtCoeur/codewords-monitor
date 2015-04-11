var Board = require('./board'),
    logger = require('./logger');

var boards = {};

/**
 * Handle all facts
 *
 * @param pub socket to publish facts to
 * @param fact a fact object received from the subscribed socket
 */
module.exports.newFact = function(pub, fact) {

    // stop processing facts for this board now
    var board = boards[fact.board];
    if (board){
        if (board.isSolved()) {
            return;
        }
    }

    switch (fact.name){
        case 'board.new':
            board = new Board(fact.board);
            boards[fact.board] = board;
            break;

        case 'word.new':
            board.addWord(fact.data.body);
            break;

        case 'cell.updated':
            board.letterSolved(fact.data.body.number, fact.data.body.letter);
            break;

        default :
            //
    }


    if (!board) {
        return;
    }

    // test if the board has just become solved
    if (board.isSolved()){

        pub.write(JSON.stringify({
            board: fact.board,
            name: 'board.solved',
            data : {
                body: {
                    duration: board.duration()
                },
                type: "application/json"
            }
        }));
    } else {
        // log what's left
        logger.info("Board: " + fact.board + " unsolved " + JSON.stringify(board.unsolved()));
    }

};