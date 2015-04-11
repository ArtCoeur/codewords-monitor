var _ = require('underscore');

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
    this.start = new Date();
    this.end = null;
}

/**
 * @param word
 */
Board.prototype.addWord = function(word){
    this.words.push(word);
};

/**
 * @param number
 * @param letter
 */
Board.prototype.letterSolved = function(number, letter){
    this.cells.push({number: number, letter: letter.toLowerCase()});

    if (this.isSolved()){
        this.end = new Date();
    }
};

/**
 * @returns {number}
 */
Board.prototype.duration = function(){
  if (!_.isNull(this.end)){
      return this.end - this.start;
  }
};

/**
 * @return boolean
 */
Board.prototype.isSolved = function(){
    return this.cells.length == 26;
};

/**
 * @return an array of the outstanding letters
 */
Board.prototype.unsolved = function(){
    var all = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var current = [];
    _.each(this.cells, function(item){
       current.push(item['letter']);
    });
    return _.difference(all, current);
};

module.exports = Board;