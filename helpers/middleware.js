const jwt = require('jsonwebtoken');
const secret = require('../config/secrets');

module.exports = {
    restricted,
    validateAuthBody
}

function restricted(req,res,next){
    const token = req.headers.authorization

    if(token){
        jwt.verify(
            token,
            secret,
            (err, decodedToken) => {
                if(err){
                    res.status(401).json({message: 'Invalid Token!! You are not authorized to access this endpoint'})
                } else {
                    req.decodedToken = decodedToken
                    next()
                }
            }
        )
    } else {
        res.status(401).json({message: 'Provide a valid token'})
    }
}

function validateAuthBody(req,res,next){
    const user = req.body 
    if(Object.keys(user).length > 0){

        if(req.path === '/login'){

            if(user.email && user.password){
                next()
            }
            else {
                res.status(400).json({message: 'Missing Required Email or Password'})
            }
            
        } else if (req.path === '/register'){

            if(user.email && user.firstName && user.lastName && user.role && user.password){
                next()
            }
            else {
                res.status(400).json({
                    message: 'Missing Required Email, Password, firstName, lastName, role or Password'
                })
            }

        }

    } else {
        res.status(400).json({message: 'Provide user details'})
    }
}