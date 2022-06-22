// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
// const dynamodb = require('aws-sdk/clients/dynamodb');
// const docClient = new dynamodb.DocumentClient();
// const tableName = process.env.SAMPLE_TABLE;

import type { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import SES from 'aws-sdk/clients/ses';

import isContact, { Contact } from '../validators/contact';

const ses = new SES({ region: 'us-east-1' });

export const isValidEmail = (email: string) =>
    String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export async function putItemHandler(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    // All log statements are written to CloudWatch
    console.info('received:', event);
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: '{}',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };

    if (event?.httpMethod !== 'POST') {
        response.statusCode = 405;
        return response;
    }

    // Get fields from the body of the request
    const body = JSON.parse(event?.body || '') as Contact;
    console.info(body);
    if (!isContact(body)) {
        response.statusCode = 400;
        return response;
    }

    // // Creates a new item, or replaces an old item with a new item
    // // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    // var params = {
    //     TableName: tableName,
    //     Item: { id: id, name: name }
    // };

    // const result = await docClient.put(params).promise();
    response.body = JSON.stringify(body);

    // All log statements are written to CloudWatch
    console.info(`response from: ${event?.path} statusCode: ${response.statusCode} body: ${response.body}`);
    const params = {
        Destination: {
            ToAddresses: ["james.w.spears@gmail.com"],
        },
        Message: {
            Body: {
                Text: { Data: `${body.name} said: ${body.message}` },
            },

            Subject: { Data: `Contact Form Submitted: ${body.email}` },
        },
        Source: "james.w.spears@gmail.com",
    };

    return ses.sendEmail(params)
        .promise()
        .then(() => response)
        .catch(() => {
            response.statusCode = 500;
            return response;
        });
}
