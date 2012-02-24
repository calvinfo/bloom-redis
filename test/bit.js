var should  = require('should'),
    bit    = require('../lib/bit');

describe('Bit Indexes', function () {

    var numHashes = 1000,
        string    = 'Hello World',
        filterSize = 100000;

    it('should be able to find a single index', function () {

        var seed    = 'a',
            a       = bit.index(seed, string, filterSize),
            b       = bit.index(seed, string, filterSize);

        a.should.eql(b);
    });

    it('should be able to find multiple indexes', function () {

        var indexes = bit.indexes(numHashes, string, filterSize);

        indexes.should.have.length(numHashes);

        indexes.forEach(function (item) {
            item.should.be.within(0, filterSize);
        });
    });

});