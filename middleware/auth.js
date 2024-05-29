const jwt = require('jsonwebtoken');
const SECRET_KEY = 'sample';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        req.user = decoded; // Attach user information to the request object
        next(); // Move to the next middleware
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = verifyToken;
