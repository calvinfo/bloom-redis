Bloom-Redis
===========

A bloom filter for node backed by redis.

Installation
------------

To install, use npm and run `npm install bloom-redis`.


Usage
-----

#### Creating a filter

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

* **client** - redis client instance from call to `connect` or explicit pass
* **size** - size of the bloom filter in bits.
* **numHashes** - number of hash functions to use
* **key** - redis key to store at


#### Adding an element to the filter

    filter.add(string, [callback]);

#### Checking for membership

    filter.contains(string, callback);

#### Clearing a filter

    filter.clear([callback]);


Additional Info
===============

Currently `md5` is used as the hash function and is seeded with different values. It has good collision resistancy against a random dataset. However, it generates far more bits than we actually need, and may not be as fast as other hash functions.

For more info on Bloom filters, you can read these excellent resources:

* [Ilya Grigorik's Bloom Filters in Ruby](http://www.igvita.com/2008/12/27/scalable-datasets-bloom-filters-in-ruby/)
* [Wikipedia](http://en.wikipedia.org/wiki/Bloom_filter)




