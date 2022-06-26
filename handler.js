"use strict";

const sendContactFormEmail = require("./handlers/sendContactFormEmail");

const HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
};

const sendContactFormEmailHandler = async (event, context, callback) => {
    let body,
        result = "empty";
    console.log("body in sendContactFormEmailHandler : ", event.body);

    try {
        body = isTestMode(event) ? event.body : JSON.parse(event.body); // required for testing
        console.log("body after try is", body);
        result = await sendContactFormEmail(body);
        console.log("result after sendContactFormEmail is", result);
        callback(null, getResponse(result));
    } catch (err) {
        console.log("err in sendContactFormEmailHandler", err);
        callback(null, getResponse(result, 500));
    }
};

function isTestMode(event) {
    let testing = false;
    if (event && event.hasOwnProperty("runPhase")) {
        testing = event.runPhase === "TEST";
    }
    return testing;
}

function getResponse(body, statusCode) {
    return {
        statusCode: statusCode || 200,
        body: JSON.stringify(body),
        headers: HEADERS,
    };
}

module.exports = {
    sendContactFormEmailHandler,
};
