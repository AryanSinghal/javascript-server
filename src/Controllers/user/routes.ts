import { Router } from 'express';
import Controller from './Controller';
import { validationHandler, authMiddleWare } from '../../libs/routes/index' ;
import { default as validation } from './validation' ;
const userRouter: Router = Router();
/**
 * @swagger
 *
 *  definitions:
 *      Login:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *              example: vinay.chaudhary@successive.tech
 *          password:
 *              type: string
 *              example: aryan@123
 *      Token:
 *          type: object
 *          properties:
 *              status:
 *                  example: Ok
 *              message:
 *                  example: Success
 *              data:
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmF5LmNoYXVkaGFyeUBzdWNjZXNzaXZlLnRlY2giLCJfaWQiOiI1ZTQ1NDA0Mzk4ZTg2ZDU3NmFkOTY0ZTYiLCJpYXQiOjE1ODIxOTY2MjUsImV4cCI6MTU4MjE5NzUyNX0.sLT3-1NmeyJtS0eDjhO3SUDiVSgaizfX0R7sqPgG040
 */

/**
 * @swagger
 *
 * /user/me:
 *   get:
 *     description: Details of the current user.
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *             $ref: '#/definitions/TraineeResponse'
 */
userRouter.route('/me')
        .get(authMiddleWare('traineeModule', 'read'), validationHandler(validation.get), Controller.me);
/**
 * @swagger
 *
 * /user/login:
 *   post:
 *     description: Login Credentials
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User email and password
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *             $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *             $ref: '#/definitions/Token'
 *       422:
 *         description: invalid email or password
 *         schema:
 *          oneOf:
 *          properties:
 *              status:
 *                  example: "Bad Request"
 *              message:
 *                  example: Password does not match
 *              err:
 *                  example: Password is incorrect
 */
userRouter.route('/login')
    .post(validationHandler(validation.login), Controller.login);
export default userRouter;
