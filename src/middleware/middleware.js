const express = require('express');
const app = express();

const authenticate = ((req, res, next) => {
    console.log('Time:', Date.now())
    next()
});

module.exports = authenticate; 