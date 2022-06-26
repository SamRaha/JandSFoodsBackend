"use strict";
// const nunjucks = require("nunjucks");
// nunjucks.configure("handlers/views", { autoescape: true });
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();
const EMAIL_FROM = "info@jandsfoods.net";
const EMAIL_TO = "info@jandsfoods.net";

module.exports = (body) => {
    const SES_CONFIG = {
        region: "eu-west-1",
    };
    const AWS_SES = new AWS.SES(SES_CONFIG);

    let params = {
        Source: EMAIL_FROM,
        Destination: {
            ToAddresses: [EMAIL_TO],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `Name: ${body.name} <br> Email: ${body.email} <br> Mobile: ${body.mobile} <br> Message: ${body.message} `,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "You have received a contact form enquiry from www.jandsfoods.net",
            },
        },
    };

    console.log("Params within sendContactFormEmail.js ", params);
    return AWS_SES.sendEmail(params).promise();
};
