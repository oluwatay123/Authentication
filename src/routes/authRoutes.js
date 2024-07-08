
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { userValidationRules, validate } = require('../middleware/validators');


router.post('/register',userValidationRules(), validate, authController.register);
router.post('/login', authController.login);
router.get('/:id', authController.getUser);

module.exports = router;


