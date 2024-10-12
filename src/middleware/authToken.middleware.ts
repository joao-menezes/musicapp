import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HttpCodes from 'http-status-codes';
import { SharedErrors } from '../shared/errors/shared-errors'
import dotenv from 'dotenv';

dotenv.config();

const secret = String(process.env.JWT_SECRET);

export const authenticateToken = (req: any, res: any, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    //Bearer

    if (!token) return res.status(HttpCodes.UNAUTHORIZED).json(SharedErrors.AccessDenied);
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(HttpCodes.BAD_REQUEST).json(SharedErrors.InvalidToken);
    }
};
