require('dotenv').config();
require('./database/database');

const http = require("http");
// import http from 'http';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});