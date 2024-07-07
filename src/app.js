const express = require('express');
const authRoutes = require('./routes/authRoutes');
const organisationRoutes = require('./routes/orgRoutes');
const userRoutes = require('./routes/userIdRoutes');




const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/organisations', organisationRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
