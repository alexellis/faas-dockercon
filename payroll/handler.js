"use strict"

const MinioClient = require('minio-db-client');

let handle = (reqIn, callback) => {
    var err = null;

    let objectStorage = new MinioClient("http://minio-shim:8080");
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

module.exports = handle;
