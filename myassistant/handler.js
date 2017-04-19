"use strict"

const fs = require('fs');
const request = require('request');
const MinioClient = require('minio-db-client');

module.exports = (req, callback) => {
    if (req.request.type == "SessionEndedRequest") {
        fs.readFile("./samples/response.json", "utf8", (err, val) => {
            let res = JSON.parse(val);

            return callback(null, {});
        });
    }

    let intentName = req.request.intent.name;

    if (intentName == "CheckCost") {
        fs.readFile("./samples/response.json", "utf8", (err, val) => {
            let res = JSON.parse(val);

            let calcReq = {
                json: true,
                uri: "http://gateway:8080/function/func_payroll",
                json: true,
                body: {}
            };
            request.post(calcReq, (err, postRes, body) => {
                if (err) {
                    res.response.outputSpeech = "There was an error calculating your payroll";

                    return callback(null, res);
                } else {
                    res.response.outputSpeech.text = "Your payroll will cost " + body.totalDollars + " dollars for this period";
                    return callback(null, res);
                }
            });
        });
    } else if (intentName == "ClearBonusAmount") {
        fs.readFile("./samples/response.json", "utf8", (err, val) => {
            let res = JSON.parse(val);

            let amount = "0";

            res.response.outputSpeech.text = "I'll do that for you now";

            let bonusAmount = parseInt(amount);
            let objectStorage = new MinioClient("http://minio-db:8080");
            let objectToStore = {
                amount: bonusAmount
            };

            objectStorage.put("bonus.json", objectToStore, (err, data) => {
                res.sessionAttributes["lastIntent"] = "";
                callback(null, res);
            });
        });
    } else if (intentName == "AddBonusAmount") {
        fs.readFile("./samples/response.json", "utf8", (err, val) => {
            let res = JSON.parse(val);

            let payee = req.session.attributes["payee"].value;
            let amount = req.request.intent.slots["amount"].value;

            res.response.outputSpeech.text = "Let me process that for you now, your payroll will cost an additional " + amount + " dollars";

            let bonusAmount = parseInt(amount);
            let objectStorage = new MinioClient("http://minio-db:8080");
            let objectToStore = {
                amount: bonusAmount
            };

            objectStorage.put("bonus.json", objectToStore, (err, data) => {
                res.sessionAttributes["lastIntent"] = intentName;
                callback(null, res);
            });
        });
    } else if (intentName == "AddBonusName") {

        fs.readFile("./samples/reprompt_response.json", "utf8", (err, val) => {
            let res = JSON.parse(val);

            let payee = req.request.intent.slots["name"].value;
            if (!payee) {
                res.response.outputSpeech.text = "Can you repeat that name please?";
                res.sessionAttributes["lastIntent"] = "";

                callback(null, res);
            } else {
                res.response.outputSpeech.text = "Pay " + payee + " how much bonus?";
                res.sessionAttributes["lastIntent"] = intentName;

                res.sessionAttributes["payee"] = payee;

                callback(null, res);
            }
        });
    }
};
