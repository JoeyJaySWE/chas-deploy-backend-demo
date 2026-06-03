const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
        }
      : undefined,
  redact: {
    paths: ['password', '*.password', '**.password', 'token', '*.token', '**.token', 'req.headers.authorization', 'req.headers.cookie'],
    censor: '[REDACTED]',
  },
});

module.exports = logger;
