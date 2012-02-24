
var redis       = require('redis'),
    should      = require('should'),
    _           = require('underscore'),
    bloom       = require('../');

describe('Filter tests', function () {

    var filter,
        key     = ['test', 'bloom-filter', Math.random()].join(':'),
        string  = 'Hello World',
        size    =  Math.pow(2, 24);

    before(function() {
        bloom.connect(redis.createClient());
    });


    it('should be able to create a filter', function () {
        filter = new bloom.BloomFilter({ key  : key,
                                         size : size,
                                         numHashes : 4 });
    });


    it('should be able to add to the filter', function (done) {
        filter.add(string, function () {
            done();
        });
    });


    it('should be able to query the filter', function (done) {
        filter.contains(string, function (err, result) {
            result.should.be.ok;
            done();
        });
    });


    it('should not contain false positives for small sizes', function (done) {
        filter.contains('False String', function (err, result) {
            result.should.not.be.ok;
            done();
        });
    });


    it('should be able to store many elements', function (done) {

        var elementCount = Math.floor(size / 1000);

        done = _.after(elementCount, done);

        _.each(_.range(elementCount), function () {
            filter.add(Math.random().toString(), function () {
                done();
            });
        });

    });


    it('should have a low number of false positives', function (done) {

        var elementCount = Math.floor(size / 1000),
            positives = 0;

        done = _.after(elementCount, done);

        _.each(_.range(elementCount), function () {
            filter.contains(Math.random().toString(), function (err, result) {
                if (result) {
                    positives += 1;
                    positives.should.be.within(0, elementCount * 0.005);
                }
                done();
            });
        });
    });

    after(function() {
        filter.client.del(key);
    });

});

