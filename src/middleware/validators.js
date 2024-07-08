const { check, validationResult } = require('express-validator');

// User validation rules
const userValidationRules = () => {
  return [
    check('firstName').not().isEmpty().trim().withMessage('First name is required'),
    check('lastName').not().isEmpty().trim().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('phone').not().isEmpty().trim().withMessage('Phone number is required'),
  ];
};

// Organization validation rules
const organisationValidationRules = () => {
  return [
    check('name').not().isEmpty().trim().withMessage('Organization name is required'),
    check('description').optional().isString().withMessage('Description must be a string'),
  ];
};

// User ID validation rule for adding user to organization
const addUserToOrganisationValidationRules = () => {
  return [
    check('userId').isUUID().withMessage('Invalid userId format'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ field: err.param, message: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  organisationValidationRules,
  addUserToOrganisationValidationRules,
  validate,
};
