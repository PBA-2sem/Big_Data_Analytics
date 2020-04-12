db.countries.mapReduce(
    function () { emit(this.region, this.name.common) },
    function (key, values) {
        values.lenght;
    },
    { out: "top_lang" }
).find()