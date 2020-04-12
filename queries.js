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