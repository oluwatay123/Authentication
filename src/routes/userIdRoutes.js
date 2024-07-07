const express = require('express');
const router = express.Router();
const UserController = require('../controllers/authController');

// Define route to get user by ID
router.get('/:id', UserController.getUser);

module.exports = router;
