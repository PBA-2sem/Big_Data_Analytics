# Big_Data_Analytics

## Exercise: Sharding in MongoDB	
[Assignment link](<./assets/MongoDBExercise.pdf>)

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

There can be a number of replica sets in a MongoDB cluster, each of which contains 3 or more mongod nodes. There are multiple shards within the clusters. Mongos communicate with each of the Shards, and the App server(config server) in turn communicates with the query router, Mongos. This way the data is partitioned.

## Exercise: MapReduce with	mongoDB	(warmup)	

As a first exercise you are required to load reddit data from the link mentioned in 2). With help of map and reduce you
need to find top 10 “lang” (language) of the documents in reddit.

**THE ABOVE DATA SET HAVE NOT EXISTED SINCE 2017 IN THE GITHUB REPO...**

We chose to use the students [dataset](./assets/students.json) instead, and for the assignment we chose to find top 10 of exam score average for all students.

### Setup of db
From assets folder run following command

```shell 
mongoimport --db school --collection students --drop --file students.json
```

- a) Provide implementation of map and reduce function

```javascript
    // Map function
    function () {
        examScore = {}
        // Extracts only exam score
        this.scores.forEach(score => {
            if (score.type === 'exam') {
                examScore = score;
            }
        });
        emit(this.student_id, examScore.score)
    }

    // Reduce function
    function (key, values) {
        return Array.sum(values) / values.length;
    }

```

- b) Provide execution command for running MapReduce

```javascript
/**
 * Find student with the highest avarage exam score
 */
db.students.mapReduce(
    // Map function
    function () {
        examScore = {}
        // Extracts only exam score
        this.scores.forEach(score => {
            if (score.type === 'exam') {
                examScore = score;
            }
        });
        emit(this.student_id, examScore.score)
    },
    // Reduce function
    function (key, values) {
        return Array.sum(values) / values.length;
    },
    {
        out: "top_10_student"
    }
    // returns student list and sorts desc and returns first 10;
).find().sort({ 'value': -1 }).limit(10)
```

- c) Provide top 10 recorded out of the sorted result. (hint: use sort on the result returned by MapReduce) 

```shell
{ "_id" : 35, "value" : 94.96865149211823 }
{ "_id" : 13, "value" : 93.68723184311095 }
{ "_id" : 44, "value" : 87.06342896975818 }
{ "_id" : 16, "value" : 86.45149548662451 }
{ "_id" : 14, "value" : 79.76784481243904 }
{ "_id" : 42, "value" : 78.17220803527422 }
{ "_id" : 28, "value" : 71.14876285300365 }
{ "_id" : 10, "value" : 69.17634380939022 }
{ "_id" : 9, "value" : 64.52152673941191 }
{ "_id" : 22, "value" : 63.138649821868874 }

```

## Exercise: MapReduce with	mongoDB	(hashtag query)	(5 points)

For this task you need to download twitter dataset from the link mentioned in 2). This time you have to answer query
“what are the top 10 hashtags used in the given tweets”. To answer this you need to use MapReduce. You can look at
the scheme of the collection using db.collection.findOne(). It will print one record with scheme information. Also you
can use function like this.hasOwnProperty(‘field_name’) to check if a field exist in the record. (if the field does not exist
you will get error. 

- a) Provide implementation of map and reduce function

```javascript
// Map function
function () {
    // Iterate all hashtags and emit text/ tag as key and add a 1 to the array for each occurance
    this.entities.hashtags.forEach(t => emit(t.text, 1));
}
// Reduce function
function (key, values) {
    // Return length of array(1's / count of hashtag)
    return values.length
}
```

- b) Provide execution command for running MapReduce

```javascript
db.tweet.mapReduce(
    // Map function
    function () {
        // Iterate all hashtags and emit text/ tag as key and add a 1 to the array for each occurance
        this.entities.hashtags.forEach(t => emit(t.text, 1));
    },
    // Reduce function
    function (key, values) {
        // Return length of array(1's / count of hashtag)
        return values.length
    },
    {
        out: "top_10_tweets",
        // only returns rows with hashtags
        query: { "entities.hashtags": { $exists: true } }
    }
    // returns student list and sorts desc and returns first 10;
).find().sort({ 'value': -1 }).limit(10)
```


- c) Provide top 10 recorded out of the sorted result. (hint: use sort on the result returned by
MapReduce) 

```javascript
{ "_id" : "FCBLive", "value" : 27 }
{ "_id" : "AngularJS", "value" : 21 }
{ "_id" : "nodejs", "value" : 20 }
{ "_id" : "LFC", "value" : 19 }
{ "_id" : "EspanyolFCB", "value" : 18 }
{ "_id" : "IWCI", "value" : 16 }
{ "_id" : "webinar", "value" : 16 }
{ "_id" : "GlobalMoms", "value" : 14 }
{ "_id" : "javascript", "value" : 14 }
{ "_id" : "RedBizUK", "value" : 12 }
```