import * as jwt from 'jsonwebtoken';
import { default as config } from '../../config/configuration';
import hasPermission from '../hasPermission';
import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import IUserModel from '../../repositories/user/IUserModel';

interface IRequest extends Request {
    user: IUserModel;
}

const authMiddleWare = (module, permissionType) => async (req: IRequest, res: Response, next: NextFunction) => {
    console.log('------------AUTHMIDDLEWARE------------', module, permissionType);
    try {
        const token: string = req.headers.authorization;
        console.log(token);
        const { key } = config;
        const decodedUser = jwt.verify(token, key);
        if (!decodedUser) {
            return next({
                status: 403,
                error: 'Unauthorized Access',
                message: 'Unauthorized Access'
            });
        }
        console.log(decodedUser);
        const userData = await UserRepository.findOne(decodedUser._id);
        console.log(userData);
        req.user = userData;
        const role: string = userData.role;
        if (decodedUser._id === req.body.id && req.method === 'PUT')
            return next();
        if (!hasPermission(module, role, permissionType)) {
            console.log(`${ role } does not permission of ${ permissionType }`);
            return next({
                status: 403,
                error: 'Unauthorized Access',
                message: 'Unauthorized Access'
            });
        }
        next();
    }
    catch (error) {
        return next({
            status: 403,
            error: 'Unauthorized Access',
            message: error.message
        });
    }
};

export { authMiddleWare };
