const router = require('express').Router();
const Users = require('../../helpers/dbModel');

router.post('/joinclass', async(req, res) => {
    try {
        let newReservation = await Users.addAttendee(req.body)
        if(!newReservation) {
            res.status(400).json({message: 'maximum number of clients for this class reached'})
        } else {
            res.status(201).json({message: 'you have successfully joined this class'})
        }
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/rescheduleclass', async(req,res) => {
    try {
        let classesbytype = await Users.findClassByCondition(req.body.type) 
        await Users.removeAttendee({userId:req.body.userId, classId:req.body.classId})
        res.status(200).json(classesbytype)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.delete('/cancelreservation/:id', async(req, res) => {
    try {
        await Users.removeAttendee(req.params.id)
        res.status(200).json({message: 'reservation has been cancelled'})
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:id/classes', async(req, res) => {
    try{
        let classesbyuser = await Users.findClassesByUserid(req.params.id)
        res.status(200).json(classesbyuser)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/createclass', async(req, res) => {
    try {
        const newClass = req.body;
        let result = await Users.addClass(newClass)
        res.status(200).json(result)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router;
