const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('../config/secrets');
const v = require('./variables');
const Users = require('../helpers/dbModel');

module.exports = {
    validateBody: function (req, res, next) {
        if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
            next();
        } else {
            res.status(400).json({ message: v.noBodyData });
        }
    },

    validateEmail: function (req, res, next) {
        const { email } = req.body;
        if (v.mailRegex.test(email)) {
            next();
        } else {
            res.status(400).json({ message: v.invalidEmail });
        }
    },

    validateUser: async function (req, res, next) {
        const { firstName, lastName, email, password, role } = req.body;
        // this ternary operator is added as a fallback in case login req body is supplied without an email
        const user = email !== undefined ? await Users.findUserBy({ email }).first() : undefined;
        if (firstName && lastName && email && password && role && req.path === "/register") {
            (user === undefined) ? next() : res.status(403).json({ message: v.alreadyInUse });
        } else if (email && password && req.path === "/login") {
            req.user = user;
            (user && bcrypt.compareSync(password, user.password)) ? next() : res.status(401).json({ message: v.invalid });
        } else {
            res.status(400).json({ message: v.missingFields });
        };
    },

    restricted: function (req, res, next) {
        const token = req.headers.authorization;
        if (token) {
            jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ message: v.tokenInvalid });
                } else {
                    req.decodedToken = decodedToken;
                    next();
                }
            })
        } else {
            res.status(400).json({ message: v.supplyToken });
        };
    },

    isInstructor: function (req, res, next) {
        req.decodedToken.role === 'instructor' ? next() : res.status(401).json({ message: v.noAccess });
    },

    isClient: function (req, res, next) {
        req.decodedToken.role === 'client' ? next() : res.status(401).json({ message: v.noAccess });
    }
}