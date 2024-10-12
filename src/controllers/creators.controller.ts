import { Request, Response } from 'express';
import HttpCodes from 'http-status-codes';
import { SharedErrors } from '../shared/errors/shared-errors';
import CreatorModel from '../models/creator.model';
import { CreatorInterface } from '../interfaces/creator.interface';

export const getCreators = async (req: any, res: any)  => {
    try {
        const creator: CreatorInterface[] = await CreatorModel.findAll();
        if (!creator.length) {
            return res.status(HttpCodes.BAD_REQUEST).json(SharedErrors.UserNotFound);
        }
        return res.status(HttpCodes.OK).json({ Creators: creator });
    } catch (error) {
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(SharedErrors.InternalServerError);
    }
};