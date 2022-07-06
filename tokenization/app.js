// Created by: Enrique Plata

'use strict'

const AWS = require('aws-sdk')
AWS.config.update({region: process.env.AWS_REGION})

const URL_EXPIRATION_SECONDS = 20

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

    let fileName = getFileName(event);

    // HTTP 200 OK, send URL
    return JSON.stringify({
        tokenizeString: fileName
    });
}

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns string fileName - File's name to be inserted into S3 bucket
 *
 */
const getFileName = function (event) {

    if (event.headers && event.headers !== "") {
        return event.headers['file-name'];
    }

};