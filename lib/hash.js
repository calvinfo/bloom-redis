//
// Hashing function for bloom filter.
//
// Converts from string to 32-bit int
// using md5
//

var crypto = require('crypto');

module.exports = function (seed, string) {

    var hash = crypto.createHash('md5');
    hash.update(seed);

    // update with a delimiter to avoid collisions
    // between similar seeds and strings which share
    // prefixes.
    hash.update('||');

    hash.update(string);

    var buffer  = new Buffer(hash.digest(), 'binary'),
        integer = 0;

    for (var i = 0; i < 4; i++) {
        integer = integer << 8;
        integer += buffer[i];
    }

    return integer;
};

