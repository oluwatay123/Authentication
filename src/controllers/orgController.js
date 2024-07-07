const Organisation = require('../models/orgModel');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');

exports.getUserOrganisations = async (req, res) => {
  const userId = req.user.userId;

  // Get organisations by user ID
  const { data: organisations, error } = await Organisation.findByUserId(userId);
  if (error) {
    console.log(error)
    return res.status(400).json({
      status: 'Bad request',
      message: 'Could not fetch organisations',
      statusCode: 400
    });
  }

  // Return success response
  res.status(200).json({
    status: 'success',
    message: 'Organisations fetched successfully',
    data: { organisations }
  });
};

exports.getOrganisationById = async (req, res) => {
    const { orgId } = req.params;
  
    try {
      const { data, error } = await Organisation.findById(orgId);
  
      if (error || !data) {
        return res.status(404).json({
          status: 'error',
          message: 'Organisation not found',
          statusCode: 404,
        });
      }
  
      res.status(200).json({
        status: 'success',
        message: 'Organisation fetched successfully',
        data: {
          orgId: data.orgId,
          name: data.name,
          description: data.description,
        },
      });
    } catch (err) {
      console.error('Error fetching organisation:', err);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        statusCode: 500,
      });
    }
  };

exports.createOrganisation =async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.userId;  // Assuming you set req.user in the auth middleware

    // Validate input
    if (!name) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Name is required',
            statusCode: 400
        });
    }

    try {
        // Create a new organisation
        const orgId = uuidv4();
        const { data: newOrg, error } = await Organisation.create({
            orgId,
            name,
            description,
            users: [userId]
        });

        // Debug logs
        console.log('New Organisation Data:', newOrg);
        console.log('Error (if any):', error);

        if (error || !newOrg) {
            console.error('Organisation creation error:', error);
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Organisation creation unsuccessful',
                statusCode: 400
            });
        }

        return res.status(201).json({
            status: 'success',
            message: 'Organisation created successfully',
            data: {
                orgId: newOrg.orgId,
                name: newOrg.name,
                description: newOrg.description
            }
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({
            status: 'Error',
            message: 'Internal Server Error',
            statusCode: 500
        });
    }
};
exports.addUserToOrganisation = async (req, res) => {
    const { orgId } = req.params;
    const { userId } = req.body;

    try {
        // Check if the user exists
        const { data: user, error: userError } = await User.getUserById(userId);
        if (userError || !user) {
            return res.status(404).json({
                status: 'Not Found',
                message: 'User not found',
                statusCode: 404
            });
        }

        // Get the organisation
        const { data: organisation, error: orgError } = await Organisation.findById(orgId);
        if (orgError || !organisation) {
            return res.status(404).json({
                status: 'Not Found',
                message: 'Organisation not found',
                statusCode: 404
            });
        }

        // Update the organisation's users array
        const updatedUsers = [...organisation.users, userId];
        const { data: updatedOrg, error: updateError } = await Organisation.updateUsers(orgId, updatedUsers);

        if (updateError) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Failed to add user to organisation',
                statusCode: 400
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'User added to organisation successfully',
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({
            status: 'Error',
            message: 'Internal Server Error',
            statusCode: 500
        });
    }
};