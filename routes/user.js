const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');
const User = require('../models/user');
const SECRET_KEY = 'sample';

router.get('/profile', verifyToken, async (req, res) => {
  try {
    // Verify and decode the token
    const email = req.user.email
    const user = await User.findOne({ email });
    // Here you can fetch user details from your database or any other source
    // Example:
    
    return res.status(201).json({ name: user.name, email: user.email, gender: user.gender, birthdate: user.birthdate });
  } catch (error) {
    console.error('Error decoding token:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
