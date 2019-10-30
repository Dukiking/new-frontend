const fetch = require('node-fetch');
const axios = require('axios');
const fs = require('fs');
var express = require('express');
process.env.BACKEND_URL = 'http://localhost:8080'
const URL_AUTHENTICATE = `${process.env.BACKEND_URL}/api/authentication/login`;
const URL_RENEWTOKEN = `${process.env.BACKEND_URL}/api/authentication/renew`;


function url(route) {
    return process.env.BACKEND_URL + route;
}
const authObject = {
    username: 'admin',
    password: 'hlFVwZLI1aqSCxl49hyY',
}

let token;

const setup = JSON.parse(fs.readFileSync('db_test_setup.json'));


async function main() {
    await auth();
    console.log(await get('/api/vcs/branch'));
    //await test_setup(setup);
    console.log(await get('/api/vcs/branch/0/signalbild'));
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
}
async function get(route, body) {
    return request('GET', route, body)
}

async function post(route, body) {
    return request('POST', route, body)
}
async function request(method, route, body) {
    const rawBody = await fetch(url(route),  {
        body: body ? JSON.stringify(body) : undefined,
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
    const resObj = await rawBody.json();
    return resObj
}
main();

var app = express();

app.use(express.static('public'));

app.get('/signals', async function (req, res) {
   res.send(await get('/api/vcs/branch/0/signalbild'));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
