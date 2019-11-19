require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routers/authentication/authRouter');
const classRouter = require('./routers/classes/classRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/class', classRouter);

server.get('/', (req, res) => {
    res.json('Api works')
})

module.exports = server;