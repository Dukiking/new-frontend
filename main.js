require('dotenv').config();

const sleep = require('sleep-promise');
const fetch = require('node-fetch');
const axios = require('axios');
const fs = require('fs');
var express = require('express');

const URL_AUTHENTICATE = `${process.env.BACKEND_URL}/api/authentication/login`;
const URL_RENEWTOKEN = `${process.env.BACKEND_URL}/api/authentication/renew`;
let token;

function url(route) {
    return process.env.BACKEND_URL + route;
}
const authObject = {
    username: process.env.BACKEND_USER,
    password: process.env.BACKEND_PW,
}

// Read db setup file.
const setup = JSON.parse(fs.readFileSync('db_test_setup.json'));

async function main() {
    // Authenticate as backend user.
    await auth();

    // Fill database with test data from file, if 'setup' argument has been provided.
    if (process.argv[2] == 'setup') {
        console.log('Filling database with test data.');
        await test_setup(setup);
    }

    //console.log(await get('/api/vcs/branch'));
    //console.log(await get('/api/vcs/branch/0/signalbild'));
}
async function test_setup(testSetup) {
    for (obj of testSetup) {
        console.log(JSON.stringify(obj));
        await post('/api/vcs/branch/0/signalbild', obj);
    }
}
async function auth() {
    const result = await (await fetch(URL_AUTHENTICATE,  {
        method: 'POST',
        body: JSON.stringify(authObject),
        headers: {
            'Content-Type': 'application/json'
        }
    })).json();
    token = result.token;
    console.log('Set new token: ' + token);
}
async function get(route, body) {
    return request('GET', route, body)
}

async function post(route, body) {
    return request('POST', route, body)
}
async function put(route, body) {
    return request('PUT', route, body)
}
async function del(route, body) {
    return request('DELETE', route, body)
}
async function request(method, route, body, retries = 0) {
    const rawBody = await fetch(url(route),  {
        body: body ? JSON.stringify(body) : undefined,
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
    let resObj;
    try{
        resObj = await rawBody.json();
    } catch (e) {
        // Sometimes the returned object is not a valid JSON for some reason.
        console.log(`Got error: ${e.message}: ${e.stack}`);
        resObj = rawBody;
    }
    //console.log(`Request result: ${JSON.stringify(resObj)}`);
    //console.log('Message: ' + resObj.message);
    const strObj = JSON.stringify(resObj);
    console.log('Response: ' + strObj);
    if (strObj.length < 500 && strObj.includes('Authentication failure')) {
        if (retries === 3) throw Error('Authentication failed after 3 retries');
        if (retries > 0) await sleep(retries * 1000); // Exponential retry backoff
        console.log('Token expired or invalid, retrying');
        await auth();
        return await request(method, route, body, ++retries);
    }
    return resObj
}
main();

var app = express();

// Serve static file from 'public' folder.

app.use(express.json());
app.use(express.static('public'));

// Define routes for express server.
app.get('/signals', async function (req, res) {
   res.send(await get('/api/vcs/branch/0/signalbild'));
})

app.post('/signals', async function (req, res) {
    const updateObj = req.body;
    console.log(`Creating new ${JSON.stringify(updateObj)}`);
    res.send(await post('/api/vcs/branch/0/signalbild', updateObj));
})

app.put('/signals', async function (req, res) {
    const updateObj = req.body;
    console.log(`Updating ${updateObj.id} with ${JSON.stringify(updateObj)}`);
    res.send(await put(`/api/vcs/branch/0/signalbild/${updateObj.id}`, updateObj));
})

app.delete('/signals', async function (req, res) {
    const updateObj = req.body;
    console.log(`Deleting ${updateObj.id}`);
    res.send(await del(`/api/vcs/branch/0/signalbild/${updateObj.id}`));
})

// Start the server.
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});