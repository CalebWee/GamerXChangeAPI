const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'sample';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, gender, birthdate } = req.body;

    if (!name || !email || !password || !gender || !birthdate ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const user = new User({ name, email, password, gender, birthdate });
    await user.save();
    
    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign( payload , SECRET_KEY, { expiresIn: '1h' });


    return res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if ( !email || !password ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign( payload , SECRET_KEY, { expiresIn: '1h' });

    return res.status(201).json({ message: 'User login successfully', token });
  } catch (error) {
    console.error('User Login Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
