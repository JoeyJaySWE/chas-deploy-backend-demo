const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Problem processing request. Try again later.',
});

const securityLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: 'To many attempts. Please try again later',
});

module.exports = { generalLimiter, securityLimiter };
