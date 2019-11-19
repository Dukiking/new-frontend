# Quick start
## Setup

1. Git clone.
2. Run `npm install` inside the directory where `package.json` resides.
3. Make sure `BACKEND_URL` in the `.env` file points to the url and port through which the backend server is accessible.
4. Set `BACKEND_USER` and `BACKEND_PW` in the `.env` file to the credentials which were shown to you in the console when first setting up the backend server.  
5. If you wish to fill the database with test data from a file, put data in JSON format into `db_test_setup.json`, then run `node main.js setup`. For now only type `signalbild` is supported. 


## Run

1. Make sure database AND backend server from previous project are running.
2. `node main.js`
3. The server should run on port `8081`.

# Development
## Developing the front-end/actual website

Put everything you need for the website into the `public` folder.

Getting `signalbild` data onto the frontend: Make a simple `HTTP GET` request onto the server at `/signals`. I suggest using the `fetch` function for this task (See reference).

## Development/extension of the backend

Use functions `get('/api/vcs/my-example-route')` or `post('/api/vcs/my-example-route')` to get or put something into the Neo4J database.
They are asynchronous so you have to `await` them and use them in a function declared with `async`. Read up on Javascript promises and then async/await if you don't know what any of this means!

Define new routes (to access from the front-end/website) as follows:
```
// Or app.post or any other HTTP method.
app.get('/my-new-route', async function (req, res) {
   // Get something from the database and send it to the client (website running in the browser).
   res.send(await get('/api/vcs/something-i-want-from-db'));
})
```

# Reference 

Read up on:
1. Javascript callbacks
2. Javascript promises
3. Javascript async/await

https://javascript.info/fetch