csv-to-array
===========

A small NPM library for converting CSV files to JSON arrays.

# Example

Having a file named `input.csv` that contains:

```
11;12;13
21;22;23
31;32;33
41;42;43
```

you can convert it into array using:

```js
// require the library
var CsvToArray = require ("csv-to-array");

// and use it
CsvToArray ({
    csvOptions: {
        delimiter: ";"
    }
  , file: __dirname + "/input.csv"
  , columns: [
        "Head 1"
      , "Head 2"
      , "Head 3"
    ]
}, function (err, response) {
    console.log(err || JSON.stringify(response, null, 4));
});
```

You can test it using `npm test`:

```sh
$ npm test

> csv-to-array@0.0.1 test /home/.../csv-to-json
> node test/run.js

[
    {
        "Head 1": "11",
        "Head 2": "12",
        "Head 3": "13"
    },
    {
        "Head 1": "21",
        "Head 2": "22",
        "Head 3": "23"
    },
    {
        "Head 1": "31",
        "Head 2": "32",
        "Head 3": "33"
    },
    {
        "Head 1": "41",
        "Head 2": "42",
        "Head 3": "43"
    }
]
```

## How to use

### `CsvToArray(@options, @callback)`

 - `@options`: object containing the following fields:
   - `csvOptions`: the options that will be passed to the a-csv module
   - `file`: the CSV file path
   - `collumns`: an array of strings

 - `@callback`: the callback function (first argument will be `err`, the second one will be an array representing the converted CSV)

## Changelog

### `v0.1.0`
 - Initial release

## License
See LICENSE file.
