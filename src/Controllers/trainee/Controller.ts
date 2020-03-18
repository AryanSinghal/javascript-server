import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { userRepository } from '../../repositories/user';
import SystemResponse from '../../libs/SystemResponse';
import sortQuery from './sortQuery';
import searchQuery from './searchQuery';

class TraineeController {
  static instance: TraineeController;
  static getInstance = () => {
    if (TraineeController.instance) {
      return TraineeController.instance;
    }
    else {
      TraineeController.instance = new TraineeController();
      return TraineeController.instance;
    }
  }

  create = async (req, res: Response) => {
    console.log('----------Create Trainee----------');
    const { address, dob, mob, hobbies, role, password } = req.body;
    let { name, email } = req.body;
    try {
      const hash = await bcrypt.hash(password, 10);
      email = email.toLowerCase();
      name = name;
      const validity = await userRepository.findByEmail(email);
      if (validity) {
        throw {
          msg: 'Email id already exist',
        };
      }
      const userData = await userRepository.create(req.user._id, { name, address, email, dob, mob, hobbies, role, password: hash });
      const message = 'Trainee added successfully';
      userData.password = '*****';
      console.log(userData);
      SystemResponse.success(res, userData, message);
    }
    catch (error) {
      return SystemResponse.failure(res, error, error.msg || 'User is not created');
    }
  };

  list = async (req: Request, res: Response) => {
    console.log('----------Trainee List----------');
    console.log(`req.query.skip = ${req.query.skip},req.query.limit = ${req.query.limit}`);
    const { order, sortBy, search } = req.query;
    try {
      const sort = sortQuery(sortBy, order);
      const searchBy = searchQuery(search);
      let dataList;
      dataList = await userRepository.list('trainee', req.query.skip, req.query.limit, sort, searchBy);
      console.log(dataList);
      const count = await userRepository.countTrainee();
      const message = 'Trainee List , No. of trainee:  ' + count;
      const data = { Count: count, ...dataList };
      SystemResponse.success(res, data, message);
    }
    catch (error) {
      return SystemResponse.failure(res, error, 'User data does not exist');
    }
  };

  update = async (req, res: Response) => {
    console.log('----------Update Trainee----------');
    try {
      const value = await userRepository.update(req.user._id, req.body.id, req.body.dataToUpdate);
      if (value) {
        const message = 'Trainee Data successfully Updated';
        const data = req.body.dataToUpdate;
        SystemResponse.success(res, data, message);
      }
      else
        return SystemResponse.failure(res, 'User data is not Updated', 'Email id already exist');
    }
    catch (error) {
      return SystemResponse.failure(res, error, 'User data is not Updated');
    }
  };

  delete = async (req, res: Response) => {
    console.log('----------Delete Trainee----------');
    try {
      const value = await userRepository.delete(req.user._id, req.params.id);
      if (value) {
        const message = 'Trainee Data Successfully Deleted';
        SystemResponse.success(res, req.params.id, message);
      }
    }
    catch (error) {
      return SystemResponse.failure(res, error, 'User data is not deleted');
    }
  };
}

export default TraineeController.getInstance();
