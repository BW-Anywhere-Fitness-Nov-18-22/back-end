const router = require('express').Router();
const Users = require('../../helpers/dbModel');

router.get('/', async (req, res) => {
    try {
        let classes = await Users.findClass()
        res.status(200).json(classes)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Client Endpoints
router.post('/signup', async (req, res) => {
    try {
        const { role } = req.decodedToken
        if (role === 'client') {
            const classId = req.body.classId
            const reservation = { userId: req.decodedToken.subject, classId }
            let newReservation = await Users.addAttendee(reservation)
            if (!newReservation) {
                res.status(400).json({ message: 'maximum number of clients for this class reached' })
            } else {
                res.status(201).json({ message: 'you have successfully signed up for the class' })
            }
        } else {
            res.status(400).json({ message: 'you are not authorised to access this information' })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/cancel', async (req, res) => {
    try {
        const { role } = req.decodedToken
        if (role === 'client') {
            const classId = req.body.classId
            const reservation = { userId: req.decodedToken.subject, classId }
            await Users.removeAttendee(reservation)
            res.status(200).json({ message: 'reservation has been cancelled' })
        }
        else {
            res.status(400).json({ message: 'you are not authorised to access this information' })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/reschedule', async (req, res) => {
    try {
        let classesbytype = await Users.findClassByCondition(req.body.type)
        await Users.removeAttendee({ userId: req.body.userId, classId: req.body.classId })
        res.status(200).json(classesbytype)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/client', async (req, res) => {
    try {
        const { subject, role } = req.decodedToken
        if (role === 'client') {
            let classesbyuser = await Users.findClassesByUserid(subject)
            res.status(200).json(classesbyuser)
        } else {
            res.status(400).json({ message: 'you are not authorised to access this information' })
        }

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/search', async (req, res) => {
    try {
        const { role } = req.decodedToken
        if (role === 'client') {
            const condition = req.body
            let classesbytype = await Users.findClassByCondition(condition)
            res.status(200).json(classesbytype)
        }
        else {
            res.status(400).json({ message: 'you are not authorised to access this information' })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// Instructor Endpoints
router.get('/instructor', async (req, res) => {
    try {
        const { subject, role } = req.decodedToken
        if (role === 'instructor') {
            let classesbyuser = await Users.findClassByInstructorId(subject)
            res.status(200).json(classesbyuser)
        } else {
            res.status(400).json({ message: 'you are not authorised to access this information' })
        }

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const { role } = req.decodedToken
        if (role === 'instructor') {
            const newClass = req.body;
            let result = await Users.addClass(newClass)
            res.status(200).json(result)
        } else {
            res.status(400).json({ message: 'you are not authorised to access this information' })
        }

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { role } = req.decodedToken
        if (role === 'instructor') {
            const newClass = req.body;
            const id = req.params.id;
            let result = await Users.editClass(id, newClass)
            res.status(200).json(result)
        } else {
            res.status(400).json({ message: 'you are not authorised to access this information' })
        }

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { role } = req.decodedToken
        if (role === 'instructor') {
            const id = req.params.id;
            let result = await Users.removeClass(id)
            res.status(200).json(result)
        } else {
            res.status(400).json({ message: 'you are not authorised to access this information' })
        }

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;
