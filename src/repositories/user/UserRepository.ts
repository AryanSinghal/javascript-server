import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
import { VersionableRepository } from '../versionable';

class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {
  constructor() {
    super(userModel);
  }

  create = (creatorId, data) => {
    return super.create(creatorId, data);
  }

  delete = (userId, id) => {
    console.log(id);
    return super.delete(userId, id);
  }

  update = (userId, id, updatedData) => {
    return super.update(userId, id, updatedData);
  }

  count = () => {
    return this.versionModel.countDocuments();
  }

  countTrainee = () => {
    return this.versionModel.countDocuments({ role: 'trainee', deletedAt: { $exists: false } });
  }

  list = (userRole, skip, limit, sort, searchBy) => {
    return super.list(userRole, skip, limit, sort, searchBy);
  }

  findOne = (id) => {
    return this.versionModel.findOne({ originalId: id }).exec();
  }

  findByEmail = (emailId) => {
    return this.versionModel.findOne({ email: emailId, deletedAt: undefined });
  }
}

export default new UserRepository();
