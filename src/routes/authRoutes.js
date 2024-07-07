// const express = require('express');
// const { register, login } = require('../controllers/authController');
// const { userValidationRules, validate } = require('../middleware/validators');
// const router = express.Router();

// router.post('/register', userValidationRules(), validate, register);
// router.post('/login', login);

// module.exports = router;


// src/routes/authRoutes.js
// const express = require('express');
// const { register, login } = require('../controllers/authController'); // Correct import
// const router = express.Router();

// router.post('/register', register); // Correctly assigning the register function
// router.post('/login', login)
// module.exports = router;


const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/:id', authController.getUser);

module.exports = router;


