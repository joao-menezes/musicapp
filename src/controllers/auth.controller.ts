import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpCodes from "http-status-codes";
import UserModel from '../models/user.model';
import dotenv from 'dotenv';
import { SharedErrors } from '../shared/errors/shared-errors';
import CreatorModel from '../models/creator.model';
import logger from '../logger';
dotenv.config()

const secret = String(process.env.JWT_SECRET);

const _fileName = module.filename.split("/").pop();

export const register = async (req: Request, res: any) => {
    try {
      const { username, email, password, isCreator } = req.body;
  
      const existingEmail = await UserModel.findOne({ where: { email } });
  
      if (existingEmail) return res.status(HttpCodes.BAD_REQUEST).json({ error: SharedErrors.EmailAlreadyExists });
  
      const hashedPassword = await bcrypt.hash(password, 10);
        
      const user = await UserModel.create({
        username,
        password: hashedPassword,
        email,
        isCreator,
      });

      if(isCreator) {
        await CreatorModel.create({ creatorId: user.userId });
      }
      logger.info(`User Created - ${_fileName}`);
      res.status(HttpCodes.CREATED).json({ message: 'User created successfully' });
    } catch (error) {
      logger.error(`Error in create user ${error} - ${_fileName}`)
      res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({ error: SharedErrors.InternalServerError });
    }
  };
  

export const login = async (req: any, res: any) => {
    try {
      const { email, password } = req.body;
  
      const user = await UserModel.findOne({ where: { email } });
  
      if (!user) {
        return res.status(HttpCodes.NOT_FOUND).json({ error: SharedErrors.UserNotFound });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(HttpCodes.UNAUTHORIZED).json({ error: SharedErrors.AccessDenied });
      }
  
      const token = jwt.sign({ userId: user.userId }, secret, { expiresIn: '1h' });
      res.status(HttpCodes.OK).json({ token, name: user.username });
    } catch (error) {
      res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({ error: 'Login failed' });
    }
  };