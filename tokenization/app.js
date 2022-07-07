// Created by: Enrique Plata

'use strict'

const AWS = require('aws-sdk')
AWS.config.update({region: process.env.AWS_REGION})

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Callback doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html
 * @param {Object} callback
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context, callback) => {

    try {
        return JSON.stringify({
            'statusCode': 200,
            'body': event
        });
    }
    catch (err) {
        console.error(err, err.stack);
    }
/*
    try {
        let data = getData(event);
        let tokenizeData = [];

        for (const dataKey in data) {
            tokenizeData.push([parseInt(dataKey), {'value': '******'}])
        }

        let body = {"data": tokenizeData};

        return {
            'statusCode': 200,
            'body': body
        }
    }
    catch(err) {
        console.error(err, err.stack);
    }
*/

}

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns  - Body passed in the event of the REST API call.
 *
 */
const getData = function (event) {
    if (event.body && event.body !== "") {
        return event.body['data'];
    }
};