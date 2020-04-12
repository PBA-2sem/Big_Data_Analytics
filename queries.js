// Assignment 1
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


// Assignment 2
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