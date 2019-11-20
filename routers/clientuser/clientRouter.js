const router = require('express').Router();
const Users = require('../../helpers/dbModel');
const v = require('../../helpers/variables');
const { validateBody } = require('../../helpers/middleware');

router.get('/class', async (req, res) => {
   try {
      const classes = await Users.findClass();
      res.status(200).json(classes)
   } catch (error) {
      res.status(500).json({ message: v.errorMessage, error: error.message })
   }
})

router.get('/reservations', async (req, res) => {
   try {
      const classes = await Users.getreservations(req.decodedToken.subject);
      // let us modify each returned object to have an instructor key formed from the firstName and lastName keys
      classes.forEach(classe => {
         classe.instructor = classe.firstName + " " + classe.lastName;
         delete classe.firstName;
         delete classe.lastName;
      })
      res.status(200).json(classes)
   } catch (error) {
      res.status(500).json({ message: v.errorMessage, error: error.message })
   }
})

router.post('/reservation', validateBody, async (req, res) => {
   const id = req.body.classId;
   try {
      let { registeredAttendees, maxClassSize } = await Users.findClassBy({ id }).first();
      if (registeredAttendees < maxClassSize) {
         await Users.addReservation({ ...req.body, userId: req.decodedToken.subject });
         let changes = {
            registeredAttendees: registeredAttendees + 1
         }
         await Users.editClass(req.body.classId, changes);
         res.status(201).json({ message: v.newEntry })
      } else (
         res.status(400).json({ message: v.limitReached })
      )
   }
   catch (error) {
      res.status(500).json({ message: v.errorMessage, error: error.message })
   }
})

router.delete('/reservation/:classId', async (req, res) => {
   const id = req.params.classId;
   try {
      let { registeredAttendees } = await Users.findClassBy({ id }).first();
      await Users.deleteReservation({ classId: req.params.classId, userId: req.decodedToken.subject });
      let changes = {
         registeredAttendees: registeredAttendees - 1
      }
      await Users.editClass(req.params.classId, changes);
      res.status(200).json({ message: v.entryRemoved('reservation') })
   }
   catch (error) {
      res.status(500).json({ message: v.errorMessage, error: error.message })
   }
})

module.exports = router;