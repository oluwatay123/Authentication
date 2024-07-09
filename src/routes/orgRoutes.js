
const express = require('express');
const router = express.Router();
const organisationController = require('../controllers/orgController');
const authMiddleware = require('../middleware/authMiddleware');
const { authenticateToken } = require('../middleware/authMiddleware');
const { auth } = require('../utils/db');
const { organisationValidationRules, addUserToOrganisationValidationRules, validate } = require('../middleware/validators');

// Protected route to get organisations
// router.get('/', authenticateToken, organisationController.getUserOrganisations);
router.get('/', authenticateToken,organisationController.getUserOrganisations );
router.get('/:orgId', authenticateToken, organisationController.getOrganisationById);
router.post('/', authenticateToken, organisationValidationRules(), validate,  organisationController.createOrganisation);
router.post('/:orgId/users', authenticateToken, addUserToOrganisationValidationRules(), validate, organisationController.addUserToOrganisation);

module.exports = router;

