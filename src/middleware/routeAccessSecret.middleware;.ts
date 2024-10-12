import { NextFunction } from 'express';
import HttpCodes from 'http-status-codes';

export const routeAccessSecret = (req: any, res: any, next: NextFunction) => {
    const accessSecret = '1234567890';

    const providedSecret = req.headers['access-secret'] as string || req.body.accessSecret;

    if (!providedSecret) {
        return res.status(HttpCodes.FORBIDDEN).json({
            message: 'Acesso negado. Por favor, forneça a senha de acesso.'
        });
    }

    if (providedSecret !== accessSecret) {
        return res.status(HttpCodes.UNAUTHORIZED).json({
            message: 'Senha de acesso incorreta.'
        });
    }
    next();
};