const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../helpers/dbModel');
const { generateToken } = require('../../helpers/tokenize');


router.post('/register', async(req, res) => {
    const {password} = req.body;
    const hash = bcrypt.hashSync(password, 14);
    req.body.password = hash;

    try {
        const user = await Users.addUser(req.body);
        const token = await generateToken(user);
        res.status(201).json({message: 'Welcome!!!!', token, user })
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
})
