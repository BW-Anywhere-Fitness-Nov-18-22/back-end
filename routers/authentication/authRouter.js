const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../helpers/dbModel');
const { generateToken } = require('../../helpers/tokenize');
const { errorMessage, regWelcome, loginWelcome } = require('../../helpers/variables');

router.post('/register', async (req, res) => {
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, 14);
    req.body.password = hash;
    try {
        const user = await Users.addUser(req.body);
        const token = await generateToken(user);
        delete user.password;
        res.status(201).json({ message: regWelcome(user.firstName), token, user })
    }
    catch (error) {
        res.status(500).json({ message: errorMessage, error: error.message });
    };
});

router.post('/login', (req, res) => {
    try {
        const token = generateToken(req.user);
        const user = req.user;
        delete user.password;
        res.status(200).json({ message: loginWelcome(user.firstName), token, user })
    }
    catch (error) {
        res.status(500).json({ message: errorMessage, error: error.message });
    }
})

module.exports = router;