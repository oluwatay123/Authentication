

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const User = require('../models/userModel');
const Organisation = require('../models/orgModel');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !password) {
    return res.status(422).json({
      errors: [
        { field: 'firstName', message: 'First name is required' },
        { field: 'lastName', message: 'Last name is required' },
        { field: 'email', message: 'Email is required' },
        { field: 'password', message: 'Password is required' }
      ]
    });
  }

  try {
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const { data: newUser, error } = await User.create({
      userId:uuidv4(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone
    });

    if (error) {
      return res.status(400).json({
        status: 'Bad request',
        message: 'Registration unsuccessful',
        statusCode: 400
      });
    }

    // Create organisation
    const { data: newOrg } = await Organisation.create({
      orgId: require('crypto').randomBytes(16).toString('hex'),
      name: `${firstName}'s Organisation`,
      description: '',
      users: [newUser[0].userId]
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser[0].userId }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Return success response
    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken: token,
        user: {
          userId: newUser[0].userId,
          firstName,
          lastName,
          email,
          phone
        }
      }
    });

  } catch (err) {
    console.error('Error registering user:', err);
    return res.status(500).json({
      status: 'Error',
      message: 'Internal Server Error',
      statusCode: 500
    });
  }
};exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(422).json({
      errors: [
        { field: 'email', message: 'Email is required' },
        { field: 'password', message: 'Password is required' }
      ]
    });
  }

  try {
    // Find user by email
    const { data: user, error } = await User.findByEmail(email);

    // Handle error or user not found
    if (error || !user) {
      console.error('Error fetching user:', error?.message || 'User not found');
      return res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed',
        statusCode: 401
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed',
        statusCode: 401
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Return success response
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        }
      }
    });
  } catch (err) {
    console.error('Unexpected error:', err.message);
    return res.status(500).json({
      status: 'Error',
      message: 'Internal Server Error',
      statusCode: 500
    });
  }
};


exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate if id is a valid UUID
    if (!id.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
      return res.status(400).json({ status: 'Bad request', message: 'Invalid user ID format' });
    }

    // Fetch user by ID from database
    const user = await User.getUserById(id);
    if (!user) {
      return res.status(404).json({ status: 'Not found', message: 'User not found' });
    }

    // Return user data
    res.status(200).json({ status: 'Success',  data: user});
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
  }
};