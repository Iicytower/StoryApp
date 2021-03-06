require('dotenv').config();
require('./database/database');

const http = require("http");
const express = require('express');

const indexRouter = require('./routes/index');

const app = express();

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, ()=>{
    console.log(`Server is started on port ${PORT}`);
});