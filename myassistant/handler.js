"use strict"

const fs = require('fs');
const request = require('request');
const MinioClient = require('minio-db-client');

module.exports = (reqIn, callback) => {
    let req = JSON.parse(reqIn);
    if (req.request.type == "SessionEndedRequest") {
        fs.readFile("./function/samples/response.json", "utf8", (err, val) => {
            let res = JSON.parse(val);

            return callback(null, {});
        });
    }

    let intentName = req.request.intent.name;

    if (intentName == "CheckCost") {
        fs.readFile("./function/samples/response.json", "utf8", (err, val) => {
            if(err != null) {
                return callback(err, null);
            }

            let res = JSON.parse(val);

            let calcReq = {
                json: true,
                uri: "http://gateway:8080/function/payroll",
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
        fs.readFile("./function/samples/response.json", "utf8", (err, val) => {
            let res = JSON.parse(val);

            let amount = "0";

            res.response.outputSpeech.text = "I'll do that for you now";

            let bonusAmount = parseInt(amount);
            let objectStorage = new MinioClient("http://minio-shim:8080");
            let objectToStore = {
                amount: bonusAmount
            };

            objectStorage.put("bonus.json", objectToStore, (err, data) => {
                res.sessionAttributes["lastIntent"] = "";
                callback(null, res);
            });
        });
    } else if (intentName == "AddBonusAmount") {
        fs.readFile("./function/samples/response.json", "utf8", (err, val) => {
            let res = JSON.parse(val);

            let payee = req.session.attributes["payee"].value;
            let amount = req.request.intent.slots["amount"].value;

            res.response.outputSpeech.text = "Let me process that for you now, your payroll will cost an additional " + amount + " dollars";

            let bonusAmount = parseInt(amount);
            let objectStorage = new MinioClient("http://minio-shim:8080");
            let objectToStore = {
                amount: bonusAmount
            };

            objectStorage.put("bonus.json", objectToStore, (err, data) => {
                res.sessionAttributes["lastIntent"] = intentName;
                callback(null, res);
            });
        });
    } else if (intentName == "AddBonusName") {

        fs.readFile("./function/samples/reprompt_response.json", "utf8", (err, val) => {
            let res = JSON.parse(val);

            let payee = req.request.intent.slots["name"].value;
            if (!payee) {
                res.response.outputSpeech.text = "Can you repeat that name please?";
                res.sessionAttributes["lastIntent"] = "";

                callback(null, res);
            } else {
                res.response.outputSpeech.text = "Pay them how much bonus?";
                res.sessionAttributes["lastIntent"] = intentName;

                res.sessionAttributes["payee"] = payee;

                callback(null, res);
            }
        });
    }
};
