const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', userId: req.userId });
});

module.exports = router;
