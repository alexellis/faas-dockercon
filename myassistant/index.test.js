"use strict"

const getStdin = require('get-stdin');
const handler = require("./handler");

var state = {};
getStdin().then(std => {
    state.rawInput = std;
    var objectData = JSON.parse(std);
    state.input = objectData;

    handler(objectData, (err, val) => {
        console.log(JSON.stringify(val));
    });
}).catch(err => {
    console.log("Error: " + err.stack);
    console.log("Raw input: " + state.rawInput);
});