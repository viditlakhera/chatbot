const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config()
const authenticate = require('./src/middleware/middleware');
const { signIn, signUp } = require('./src/api/authentication');
const socket = require('./src/socket/socket');
// const client = require ('./src/socket/client');

app.use(authenticate);
app.use(express.json());

app.get("/home", (req, res) => {
    console.log("home route")
    res.send('home route');
})

app.post("/api/signup", async (req, res) => {
    await signUp(req, res);
})

app.post("/api/signin", async (req,res) =>{
    await signIn(req,res);
})

app.listen(port, () => {
    console.log(`port is listening on ${port}`);
});
