const logger = require('./logger');

function logSecurityEvent({ event, userId, role, success, password, metadata = {} }) {
  logger.info({
    type: 'SECURITY_EVENT',
    event,
    userId,
    role,
    password,
    success,
    metadata,
    timestamp: new Date().toISOString(),
  });
}

module.exports = logSecurityEvent;
