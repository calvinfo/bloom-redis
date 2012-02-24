var BloomFilter = require('./lib');

// Shared connection between all bloom filters.
var connection = null;

exports.connect = function connect(client) {
    connection = client;
};

exports.BloomFilter = function (options) {

    if (!options.client && connection) {
        options.client = connection;
    }

    if (!options.client) {
        throw new Error('Must either call connect or explicitly pass a client');
    }

    return new BloomFilter(options);
};

exports.connection = connection;