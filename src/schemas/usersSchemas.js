const { z } = require('zod');

const registerSchema = z.object({
  email: z.email('Invalid email'),
  username: z.string().min(3, 'Username must be atleast 3 characters long'),
  password: z.string().min(8, 'Password must be atleast 8 chracters long'),
  role: z.enum(['user', 'moderator', 'admin']).optional(),
});

const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be atleast 8 chracters long'),
});

module.exports = { registerSchema, loginSchema };
