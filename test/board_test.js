var assert = require('assert'),
    Board = require('../src/lib/board');

describe('Board', function(){

    describe('isSolved', function(){

        it('should return false on creation', function(){
            var b = new Board('abc');
            assert(b.isSolved() == false);
            assert(b.duration() == null);
        });

        it ('should return false with one cell solved', function(){
           var b = new Board('aaa');
            b.letterSolved(1, 'a');
            assert(b.isSolved() == false);
            assert(b.duration() == null);
        });

        it ('should return true with all solved', function(){
            var b = new Board('bbb');

            var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
            for (var i = 0; i < 26; i++){
                assert(b.isSolved() == false);
                b.letterSolved(i+1, letters[i]);
            }
            assert(b.isSolved());
            assert(b.duration() != null);
        });
    })
});