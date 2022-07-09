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
        let data = atob(event.body['data']);
        let tokenizedData = [];
        for (const dataKey in data) {
            tokenizedData.push([parseInt(dataKey), 'XXXXX']);
            console.log('what is this',dataKey);
        }
        return JSON.stringify(
            {
                'statusCode': 200,
                'data': tokenizedData
            }
        );
    }
    catch (err) {
        console.log('here is the error',err);
    }
}