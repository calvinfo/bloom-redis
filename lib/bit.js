var hash = require('./hash');

var index = function index(seed, string, size) {

    var result = hash(seed, string);

    // Strip the two's complement negative bit
    var bitIndex = result & (-1 >>> 1);

    // If the result has a 1 as its leading bit,
    // multiply our index by 2 to compensate.
    if ((result >>> 31) === 1) {
        bitIndex *= 2;
    }

    return (bitIndex % size);
};

var indexes = function indexes(numHashes, string, size) {

    var output = new Array(numHashes);

    for (var i = 0; i < numHashes; i++) {
        var bitIndex = index(i.toString(), string, size);
        output[i] = bitIndex;
    }

    return output;
};

exports.index = index;
exports.indexes = indexes;