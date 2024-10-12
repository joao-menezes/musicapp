import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { authLimiter } from '../middleware/authRateLimiter.middleware';

const authrouter = Router();

authrouter.post('/register', authLimiter, register);
authrouter.post('/login', authLimiter, login);

export default authrouter;