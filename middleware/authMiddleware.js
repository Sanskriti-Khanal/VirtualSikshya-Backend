const jwt = require('jsonwebtoken');

const authMiddleware = (roles) => (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from the Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Verify token
    if (!roles.includes(decoded.role)) {  // Check if the role is allowed for the route
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }

    req.user = decoded; // Attach the decoded user info (role, id, etc.) to the request object
    next(); // Proceed to the next middleware/handler
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
