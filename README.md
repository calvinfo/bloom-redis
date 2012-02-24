Bloom-Redis
===========

A bloom filter for node backed by redis.

Installation
------------

To install, use npm and run `npm install bloom-redis`.


Usage
-----

**** Creating a filter

Like mongoose, bloom-redis allows you to specify a single redis client for your filters to connect to. Alternatively, you can give a client to each filter instance.

To use a single redis client, use the `bloom.connect` call as shown below:


    var redis = require('redis'),
        bloom = require('bloom-redis');

    var client = redis.createClient();
    bloom.connect(client);

    filter = new bloom.BloomFilter({ key : 'mykey' });


You may also pass in the client to the filter explicitly

    filter = new bloom.BloomFilter({ client : otherClient,
                                     key    : 'otherKey' });


Filters take the following options:

* **client** - required redis client instance from call to `connect` or explicit pass






First you must create a `BloomFilter`.