const jwt = require('jsonwebtoken');
const errors = require('../errors');

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.token;

    let token = null;

    if (cookieToken) {
      token = cookieToken;
    } else if (!token && authHeader?.startsWith('Bearer ')) {
      // authHeader = 'Bearer <TOKEN>'
      // authHeader.split(' ') = ['Bearer', '<TOKEN>']
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new errors.UnauthorizedError('Token missing');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    next(new errors.UnauthorizedError('Invalid or expired token'));
  }
}

module.exports = authMiddleware;
