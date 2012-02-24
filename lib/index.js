
var crypto = require('crypto'),
    hash   = require('./hash'),
    bit   = require('./bit');


module.exports = BloomFilter;


function BloomFilter(options) {

    this.options   = options;
    this.client    = options.client;

    // Set up our defaults, client is required.
	this.numHashes = options.numHashes || 4;

    // Default to 2mb allocation
	this.size      = options.size || Math.pow(2, 24);

    this.key       = options.key ||
                     ['bloom-filter', Math.random().toString()].join(':');
}


BloomFilter.prototype.contains = function contains(string, callback) {

    var multi   = this.client.multi(),
        indexes = bit.indexes(this.numHashes, string, this.size);

    var self = this;

    indexes.forEach(function (index) {
        multi.getbit(self.key, index);
    });


    multi.exec(function (err, bits) {
        if (err) {
            if (callback) return callback(err);
        } else {

            var isAbsent = bits.some(function (bit) {
                return bit === 0;
            });

            return callback(null, !isAbsent);
        }
    });
};


BloomFilter.prototype.add = function add(string, callback) {

    var multi   = this.client.multi(),
        indexes = bit.indexes(this.numHashes, string, this.size);

    var self = this;

    indexes.forEach(function (index) {
        multi.setbit(self.key, index, 1);
    });

    return multi.exec(callback);
};


BloomFilter.prototype.clear = function clear(callback) {
    this.client.del(this.key, callback);
};
