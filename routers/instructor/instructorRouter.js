const router = require('express').Router();
const Users = require('../../helpers/dbModel');
const v = require('../../helpers/variables');
const { validateBody } = require('../../helpers/middleware');

router.get('/class', async (req, res) => {
   const instructorId = req.decodedToken.subject;
   try {
      const classes = await Users.findClassBy({ instructorId });
      res.status(200).json(classes)
   }
   catch (error) {
      res.status(500).json({ message: v.errorMessage, error: error.message })
   }
})

router.post('/class', validateBody, async (req, res) => {
   try {
      const newClass = await Users.addClass({ ...req.body, instructorId: req.decodedToken.subject });
      res.status(201).json({ message: v.newEntry, newClass })
   }
   catch (error) {
      res.status(500).json({ message: v.errorMessage, error: error.message });
   }
})

router.put('/class/:id', async (req, res) => {
   try {
      const id = req.params.id;
      const { instructorId } = await Users.findClassBy({ id }).first();
      // let us find the class and check that the instructor is the right owner
      if (instructorId === req.decodedToken.subject) {
         const updatedClass = await Users.editClass(req.params.id, req.body);
         res.status(200).json({ message: v.updatedEntry, updatedClass });
      } else {
         res.status(401).json({ message: v.noAccess })
      }
   }
   catch (error) {
      res.status(500).json({ message: v.errorMessage, error: error.message });
   }
})

router.delete('/class/:id', async (req, res) => {
   try {
      const id = req.params.id;
      const { instructorId } = await Users.findClassBy({ id }).first();
      if (instructorId === req.decodedToken.subject) {
         await Users.removeClass(req.params.id);
         res.status(200).json({ message: v.entryRemoved('class') });
      } else {
         res.status(401).json({ message: v.noAccess })
      }
   } catch (error) {
      res.status(500).json({ message: v.errorMessage, error: error.message });
   }
})

module.exports = router;