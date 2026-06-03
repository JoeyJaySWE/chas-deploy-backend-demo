const express = require('express');
const errors = require('../errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const schemas = require('../schemas');
const { validateRequest } = require('../middleware/validate');
const authMiddleware = require('../middleware/authMiddleware');
const { authenticate } = require('../middleware/authenticator');
const logSecurityEvent = require('../utlis/securityLogger');
const { securityLimiter, generalLimiter } = require('../middleware/limters');
const ms = require('ms');
require('dotenv').config();

const users = [];

const { usersSchemas } = schemas;

const router = express();
router.use(express.json());

router.post('/register', validateRequest({ body: usersSchemas.registerSchema }), async (req, res, next) => {
  try {
    const { email, password, username } = req.validatedBody;

    const isExistingUser = users.find((user) => user.email === email);

    if (isExistingUser) {
      throw new errors.ConflictError('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: Date.now().toString(),
      email,
      username,
      password: hashedPassword,
      role: ['user', 'admin'],
    };

    users.push(user);

    logSecurityEvent({
      event: 'USER_REGISTER',
      userId: user.id,
      role: user.role,
      password: password,
      success: true,
    });

    res.status(201).json({
      message: 'User created!',
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', securityLimiter, validateRequest({ body: usersSchemas.loginSchema }), async (req, res, next) => {
  try {
    const { email, password } = req.validatedBody;

    const user = users.find((u) => u.email === email);

    if (!user) {
      throw new errors.UnauthorizedError('Invalid credntials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new errors.UnauthorizedError('Invalid credntails');
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,

      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: ms(process.env.JWT_EXPIRE), // 1 * 60 * 60 * 1000
    });

    res.json({ token });

    logSecurityEvent({
      event: 'USER_LOGIN',
      userId: user.id,
      role: user.role,
      password: user.password,
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Access granted to protected page',
    user: req.user,
  });
});

router.get('/admin-tools', authMiddleware, authenticate(['admin']), (req, res) => {
  req.log.info({
    event: 'ADMIN TOOLS VISITED',
  });
  res.json({
    message: 'Access granted to admin tools',
    user: req.user,
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });

  res.status(200).json({
    message: 'Logged out successfully',
  });
});
module.exports = router;
