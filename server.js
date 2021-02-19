const app = require('./api/index');
const express = require('express');
const path = require('path');

app.use(express.static(__dirname + '/dist/zequiz'));


