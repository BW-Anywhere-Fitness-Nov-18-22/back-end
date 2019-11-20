require('dotenv').config();

const path = require("path");
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const authRouter = require('../routers/authentication/authRouter');
const classRouter = require('../routers/classes/classRouter');
const { validateBody, validateEmail, validateUser, restricted } = require('../helpers/middleware');
const { errorMessage } = require('../helpers/variables')

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', validateBody, validateEmail, validateUser, authRouter);
server.use('/api/class', restricted, classRouter);

server.get("/", (req, res) => {
    try {
        res.sendFile(path.join(__dirname + "/index.html"));
    }
    catch (error) {
        res.status(500).json({
            message: errorMessage,
            error: error.message
        })
    }
});

module.exports = server;