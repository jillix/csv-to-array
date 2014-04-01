// dependencies
var CSV = require ("a-csv");

/**
 *  csv-to-json
 *  A small NPM library for converting CSV files to JSON arrays.
 *
 *  Arguments
 *    @options: object containing the following fields:
 *      - csvOptions: the options that will be passed to the a-csv module
 *      - file: the CSV file path
 *      - collumns: an array of strings
 *
 *  This function converts the content from a csv file into
 *  a json array using a-csv module.
 *
 *  e.g.
 *    CSV file content:
 *      1;2;3
 *      4;5;6
 *    columns: ["column1", "column2", "column3"]
 *
 *    =>
 *      [
 *          {
 *              "column1": "1",
 *              "column2": "2",
 *              "column3": "3"
 *          },
 *          {
 *              "column1": "4",
 *              "column2": "5",
 *              "column3": "6"
 *          }
 *      ]
 *
 * */
module.exports = function (options, callback) {

    // validate callback
    callback = callback || function () {};
    if (typeof callback !== "function") {
        throw new Error ("callback must be a function");
    }

    // force options to be an object
    options = Object (options);

    // force csvoptions to be an object
    options.csvOptions = Object (options.csvOptions);

    // force file to be a string
    options.file = String (options.file);

    // validate columns (non empty array)
    if (!options.columns || !options.columns.length || options.columns.constructor !== Array) {
        return callback ("columns must be a non empty array");
    }

    // this will be the array generated from csv data
    var array = [];

    // start csv parsing
    CSV.parse(options.file, options.csvOptions, function (err, row, next) {

        // handle error
        if (err) {
            return callback (err);
        }

        // not the last row
        if (row !== null) {

            // row --> object
            var cRow = {};

            // each column from row
            for (var i = 0; i < options.columns.length; ++i) {

                // column --> key in object
                cRow[options.columns[i]] = row[i];
            }

            // push the row in the array
            array.push(cRow);

            // next row
            return next();
        }

        // finally send the response
        callback (null, array);
    });
};
