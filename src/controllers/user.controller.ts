import { Request, Response } from 'express';
import HttpCodes from 'http-status-codes';
import UserModel from '../models/user.model';
import { SharedErrors } from '../shared/errors/shared-errors';
import { UserInterface } from '../interfaces/user.interface';
import CreatorModel from '../models/creator.model';
import { where } from 'sequelize';

export const getUsers = async (req: any, res: any)  => {
    try {
        const users: UserInterface[] = await UserModel.findAll();
        if (!users.length) {
            return res.status(HttpCodes.BAD_REQUEST).json(SharedErrors.UserNotFound);
        }
        return res.status(HttpCodes.OK).json({ Users: users });
    } catch (error) {
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(SharedErrors.InternalServerError);
    }
};

export const getUserById = async (req: any, res: any) => {
    const { userId } = req.params;

    try {
        const user =  await UserModel.findOne({ where: { userId } });

        if (!user) return res.status(HttpCodes.NOT_FOUND).json(SharedErrors.UserNotFound);
        
        return res.status(HttpCodes.OK).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(SharedErrors.InternalServerError);
    }
};

export const updateUser = async (req: any, res: any) => {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    try {
        const user = await UserModel.findOne({ where: { userId } });

        if (!user) {
            return res.status(HttpCodes.NOT_FOUND).json(SharedErrors.UserNotFound);
        }

        await user.update({
            username,
            email,
            password,
        });

        return res.status(HttpCodes.OK).json({ message: 'user updated', user });
    } catch (error) {
        console.error('Error in found users:', error);
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(SharedErrors.InternalServerError);
    }
};
