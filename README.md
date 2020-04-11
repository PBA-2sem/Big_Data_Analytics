# Big_Data_Analytics

## Exercise: Sharding in MongoDB	

- What is sharding in mongoDB?

Sharding is the process of storing data records across multiple machines and it is MongoDB's approach to meeting the demands of data growth. As the size of the data increases, a single machine may not be sufficient to store the data nor provide an acceptable read and write throughput.

- What are the different components required to implement sharding?

**shard**: Each shard contains a subset of the sharded data. As of MongoDB 3.6, shards must be deployed as a replica set.


**mongos**: The mongos acts as a query router, providing an interface between client applications and the sharded cluster.


**config servers**: Config servers store metadata and configuration settings for the cluster. As of MongoDB 3.4, config servers must be deployed as a replica set (CSRS).

Stolen from: [here](https://docs.mongodb.com/manual/core/sharded-cluster-components/) 

- Explain architecture of sharding in mongoDB? 

![hey](https://docs.mongodb.com/manual/_images/sharded-cluster-test-architecture.bakedsvg.svg)

Stolen from: [here](https://docs.mongodb.com/manual/_images/sharded-cluster-test-architecture.bakedsvg.svg) 

There are number of replica sets in a MongoDB cluster, each of which contains 3 or more mongod nodes. There are multiple shards within the clusters. Mongos communicate with each of the Shards, and the App server in turn communicates with the query router, Mongos. This way the data is partitioned.

## Exercise: MapReduce with	mongoDB	(warmup)	

As a first exercise you are required to load reddit data from the link mentioned in 2). With help of map and reduce you
need to find top 10 “lang” (language) of the documents in reddit. 

- a) Provide implementation of map and reduce function

        Javascript

- b) Provide execution command for running MapReduce

        Javascript

- c) Provide top 10 recorded out of the sorted result. (hint: use sort on the result returned by MapReduce) 

        Javascript

## Exercise: MapReduce with	mongoDB	(hashtag query)	(5 points)

For this task you need to download twitter dataset from the link mentioned in 2). This time you have to answer query
“what are the top 10 hashtags used in the given tweets”. To answer this you need to use MapReduce. You can look at
the scheme of the collection using db.collection.findOne(). It will print one record with scheme information. Also you
can use function like this.hasOwnProperty(‘field_name’) to check if a field exist in the record. (if the field does not exist
you will get error. 

- a) Provide implementation of map and reduce function

        Javascript

- b) Provide execution command for running MapReduce

        Javascript

- c) Provide top 10 recorded out of the sorted result. (hint: use sort on the result returned by
MapReduce) 

        Javascript
