require('dotenv').config();
const path = require("path");
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routers/authentication/authRouter');
const classRouter = require('./routers/classes/classRouter');
const {restricted} = require('./helpers/middleware');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/class', [restricted], classRouter);

server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

module.exports = server;