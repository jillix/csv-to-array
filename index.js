// Dependencies
var CSV = require ("a-csv");

/**
 * CsvToArray
 * Converts CSV files to JSON arrays.
 *
 * Example
 *
 *  - File content:
 *
 *    ```csv
 *    1;2;3
 *    4;5;6
 *    ```
 *
 * ```js
 * var columns = ["column1", "column2", "column3"];
 * require("csv-to-array")({
 *    file: "path/to/input/file.csv",
 *    columns: columns
 * }, function (err, array) {
 *   console.log(err || array);
 * });
 * ```
 *
 * Output:
 *
 * ```json
 * [
 *     {
 *         "column1": "1",
 *         "column2": "2",
 *         "column3": "3"
 *     },
 *     {
 *         "column1": "4",
 *         "column2": "5",
 *         "column3": "6"
 *     }
 * ]
 * ```
 *
 * @name CsvToArray
 * @function
 * @param {Object} options Object containing the following fields:
 *
 *  - `csvOptions` (Object): The options that will be passed to the `a-csv` module.
 *  - `file` (String): The CSV file path.
 *  - `collumns` (Array): An array of strings with the columns from CSV file.
 *
 * @param {Function} callback The callback function.
 * @return {undefined}
 */
var CsvToArray = module.exports = function (options, callback) {

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
