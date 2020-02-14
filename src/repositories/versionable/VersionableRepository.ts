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
    async delete(req, id) {
        const oldData: any = await this.versionModel.findOne({originalId: id , deletedAt: undefined}).exec();
        return this.versionModel.findByIdAndUpdate( oldData._id ,
            {
            deletedAt: Date.now(),
            deletedBy: req.user._id
            }
        );
    }
    async update(req, id, updatedData) {
        const oldData: any = await this.versionModel.findOne({originalId: id , deletedAt: undefined}).exec();
        this.versionModel.create({
            ...updatedData,
            originalId: id,
            updatedAt: Date.now(),
            updatedBy: req.user._id
        });
        return this.versionModel.findByIdAndUpdate( oldData._id ,
            {
            deletedAt: Date.now(),
            deletedBy: req.user._id
            }
        );
    }
    public list(userRole, skipRecord, limitRecord, sortBy) {
        return this.versionModel.find({deletedAt: undefined, role: userRole}).sort(sortBy).skip(Number(skipRecord)).limit(Number(limitRecord));
    }
}