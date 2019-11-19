const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../helpers/dbModel');
const { generateToken } = require('../../helpers/tokenize');
const {validateAuthBody} = require('../../helpers/middleware');


router.post('/register', validateAuthBody, async(req, res) => {
    try {
        const {password} = req.body;
        const hash = bcrypt.hashSync(password, 14);
        req.body.password = hash;

        let user = await Users.addUser(req.body);
        const token = await generateToken(user);
        user = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
            }
        res.status(201).json({message: 'Welcome!!!!', token, user })
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
})

router.post('/login', validateAuthBody, async(req,res) => {
    try{
        const {email, password} = req.body;

        let user = await Users.findUserBy({email})
        if(user && bcrypt.compareSync(password, user.password)){
            const token = await generateToken(user)
            user = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
                }
            res.status(201).json({message: 'Welcome!!!!', token, user })
        }
    }
    catch (error){
        res.status(500).json({errorMessage: error.message});
    }  

})

module.exports = router;