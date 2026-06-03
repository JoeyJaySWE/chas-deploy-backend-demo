const usersRoutes = require('./src/routes/users');
const express = require('express');
const { validateRequest } = require('./src/middleware/validate');
const errorHandler = require('./src/middleware/errorHandler');
const errors = require('./src/errors');
const schemas = require('./src/schemas');
const { pinoHttp } = require('pino-http');
const logger = require('./src/utlis/logger');
const cors = require('cors');
const { includes } = require('zod');
const validateEnvs = require('./src/config/envValidator');
const cookieParser = require('cookie-parser');

try {
  validateEnvs();
} catch (err) {
  console.error(err.message, err.stack);
  process.exit(1);
}

const { productsSchemas } = schemas;

const PORT = process.env.PORT ?? 3000;
const ROOT_URL = process.env.ROOT_URL ?? 'http://localhost';

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    credentials: includes,
  })
);

app.use(express.json());
app.use(pinoHttp({ logger }));
app.use('/api/v1/users', usersRoutes);

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: `I'm OK!`,
  });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on ${ROOT_URL}:${PORT}`));
