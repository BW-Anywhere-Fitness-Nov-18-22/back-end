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

module.exports = router;