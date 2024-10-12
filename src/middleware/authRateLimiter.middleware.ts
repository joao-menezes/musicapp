import rateLimit from "express-rate-limit";
import HttpCodes from 'http-status-codes';

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // max attempts per IP
    message: { error: 'Too many attempts of login or register, try again later.' },
    statusCode: HttpCodes.TOO_MANY_REQUESTS, // 429
  });