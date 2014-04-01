// require the library
var CsvToArray = require ("../index");

// and use it
CsvToArray ({
    csvOptions: {
        delimiter: ";"
    }
  , file: "./input.csv"
  , columns: [
        "Head 1"
      , "Head 2"
      , "Head 3"
    ]
}, function (err, response) {
    console.log(err || JSON.stringify(response));
});
