const jwt = require('jsonwebtoken');

// Middleware for authentication
module.exports.authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
          return res.status(401).json({ message: 'No token, authorization denied' });
        }
           
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Decoded Token:', decoded);
        req.user = { _id: decoded.id, email: decoded.email, role: decoded.role }
          
      

        if (!req.user || !req.user._id) {
          return res.status(401).json({ message: 'User information missing from token' });
        }
        
        next();
      } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
      }
  };