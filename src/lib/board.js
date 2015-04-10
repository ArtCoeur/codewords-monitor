/**
 * Stores information on a Board
 * the words contained
 * the number of solved letters
 * whether the board is solved
 */

function Board(name){
    this.name = name;
    this.words = [];
    this.cells = [];
}

/**
 *
 * @param word
 */
Board.prototype.addWord = function(word){
    this.words.push(word);
};

/**
 *
 * @param number
 * @param letter
 */
Board.prototype.letterSolved = function(number, letter){
    this.cells.push({number: number, letter: letter});
};

/**
 * @return boolean
 */
Board.prototype.isSolved = function(){
    return this.cells.length == 26;
};
