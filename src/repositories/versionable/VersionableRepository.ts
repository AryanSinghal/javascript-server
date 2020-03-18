import * as mongoose from 'mongoose';
import { IVersionableDocument, VersionableRepository } from '.';

export default class VersionRepository< D extends mongoose.Document, M extends mongoose.Model<D> > {
    protected versionModel: M ;
    constructor(versionModel) {
        this.versionModel = versionModel;
    }
    public static generateObjectId = () => {
        return String(mongoose.Types.ObjectId());
    }
    public create(creatorId, data) {
        const id = VersionableRepository.generateObjectId();
        return this.versionModel.create({
            ...data,
            _id: id,
            originalId: id,
            createdBy: creatorId,
            createdAt: Date.now(),
        });
    }
    async delete(userId, id) {
        const oldData: any = await this.versionModel.findOne({originalId: id , deletedAt: undefined}).exec();
        return this.versionModel.findByIdAndUpdate( oldData._id ,
            {
            deletedAt: Date.now(),
            deletedBy: userId
            }
        );
    }
    async update(userId, id, updatedData) {
        const oldData: any = await this.versionModel.findOne({originalId: id , deletedAt: undefined}).exec();
        const { name, address, email, dob, mob, hobbies, role, password} = oldData;
        if ( updatedData.email !== undefined)
            updatedData.email = updatedData.email.toLowerCase();
        const bool = await this.versionModel.findOne({email: updatedData.email, deletedAt: undefined});
        console.log(updatedData.email, email , bool, updatedData.email !== email);
        if ( !(updatedData.email !== email && updatedData.email !== undefined && bool !== null)) {
            this.versionModel.create({
                name, address, email, dob, mob, hobbies, role,
                ...updatedData,
                password,
                originalId: id,
                updatedAt: Date.now(),
                updatedBy: userId,
            });
            return this.versionModel.findByIdAndUpdate( oldData._id ,
                {
                deletedAt: Date.now(),
                deletedBy: userId,
                }
            );
        }
        else {
            return false;
        }
    }
    public list(userRole, skipRecord, limitRecord, sort, searchBy) {
        return this.versionModel.find({deletedAt: undefined, role: userRole, ...searchBy}, {password: 0}).sort(sort).skip(Number(skipRecord)).limit(Number(limitRecord));
    }
}
