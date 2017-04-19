"use strict"

const getStdin = require('get-stdin')
const MinioClient = require('minio-db-client');

var state = {};
getStdin().then(std => {
    state.rawInput = std;
    var objectData = JSON.parse(std);
    state.input = objectData;
    handle(objectData, (err, val) => {
        console.log(JSON.stringify(val));
    });
}).catch(err => {
    console.log(err.stack, state.rawInput);
})

let handle = (req, callback) => {
    var err = null;

    let objectStorage = new MinioClient("http://minio-db:8080");
    objectStorage.get("bonus.json", (err, data) => {
        let bonusAmount = 0;

        if (!err && data && data.amount) {
            bonusAmount = data.amount;
        }

        callback(err, {
            totalDollars: 105 + bonusAmount
        });
    });
};