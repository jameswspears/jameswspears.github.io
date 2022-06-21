'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SES = require('aws-sdk/clients/ses');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var SES__default = /*#__PURE__*/_interopDefaultLegacy(SES);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

// Create clients and set shared const values outside of the handler.
const ses = new SES__default["default"]({ region: 'us-east-1' });
const isValidEmail = (email) => String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
function putItemHandler(event) {
    return __awaiter(this, void 0, void 0, function* () {
        // All log statements are written to CloudWatch
        console.info('received:', event);
        const response = {
            statusCode: 200,
            body: '{}',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
        if ((event === null || event === void 0 ? void 0 : event.httpMethod) !== 'POST') {
            response.statusCode = 405;
            return response;
        }
        // Get fields from the body of the request
        const body = JSON.parse(event === null || event === void 0 ? void 0 : event.body);
        const token = body.token;
        const name = body.name;
        const email = body.email;
        const message = body.message;
        if (!token || typeof token !== 'string' ||
            !name || typeof name !== 'string' ||
            !email || typeof email !== 'string' || !isValidEmail(email) ||
            !message || typeof message !== 'string') {
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
        console.info(`response from: ${event === null || event === void 0 ? void 0 : event.path} statusCode: ${response.statusCode} body: ${response.body}`);
        const params = {
            Destination: {
                ToAddresses: ["james.w.spears@gmail.com"],
            },
            Message: {
                Body: {
                    Text: { Data: `${name} said: ${message}` },
                },
                Subject: { Data: `Contact Form Submitted: ${email}` },
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
    });
}

exports.putItemHandler = putItemHandler;
