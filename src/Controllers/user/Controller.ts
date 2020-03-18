import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { userRepository } from '../../repositories/user';
import SystemResponse from '../../libs/SystemResponse';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';

class Controller {
  static instance: Controller;
  static getInstance = () => {
    if (Controller.instance) {
      return Controller.instance;
    }
    else {
      Controller.instance = new Controller();
      return Controller.instance;
    }
  }
  me = (req, res: Response) => {
    console.log('--------------me-------------');
    try {
      delete req.user.password;
      SystemResponse.success(res, req.user, 'User data fetched');
    }
    catch (err) {
      SystemResponse.failure(res, err.message);
    }
  }
  login = async (req, res: Response) => {
    console.log('--------------Login-------------');
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const user = await userRepository.findByEmail(email);
      if (!user) {
        return SystemResponse.failure(res, 'User data not found', 'User not found', 404);
      }
      const result = await bcrypt.compare(password, user.password);
      console.log(result);
      if (!result) {
        return SystemResponse.failure(res, 'Password is incorrect', 'Password does not match', 422);
      }
      console.log('Password matched');
      const token = jwt.sign({ email: user.email, _id: user.originalId }, config.key, { expiresIn: 900 });
      return SystemResponse.success(res, token);
    }
    catch (err) {
      console.log(err);
      return SystemResponse.failure(res, err.message);
    }
  }
}

export default Controller.getInstance();
