var should = require('should')
  , hash = require('../lib/hash');


describe('Hashing', function () {

    it('should hash a single string consistently', function () {
        var a = hash('a', 'b'),
            b = hash('a', 'b');

        a.should.eql(b);
    });

    it('should be collision resistant', function () {

        var numHashes = 1000,
            output = {};

        for (var i = 0; i < numHashes; i++) {
            output[hash(Math.random().toString(),
                   Math.random().toString())] = 1;
        }

        Object.keys(output).should.have.length(numHashes);
    });

});