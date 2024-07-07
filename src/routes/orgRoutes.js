// const express = require('express');
// const { createOrganisation, getOrganisations } = require('../controllers/orgController');
// const authenticate = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/', authenticate, createOrganisation);
// router.get('/', authenticate, getOrganisations);

// module.exports = router;


const express = require('express');
const router = express.Router();
const organisationController = require('../controllers/orgController');
const authMiddleware = require('../middleware/authMiddleware');
const { authenticateToken } = require('../middleware/authMiddleware');
const { auth } = require('../utils/ db');

// Protected route to get organisations
// router.get('/', authenticateToken, organisationController.getUserOrganisations);
router.get('/', authenticateToken,organisationController.getUserOrganisations );
router.get('/:orgId', authenticateToken, organisationController.getOrganisationById);
router.post('/', authenticateToken, organisationController.createOrganisation);
router.post('/:orgId/users', authenticateToken, organisationController.addUserToOrganisation);

module.exports = router;

